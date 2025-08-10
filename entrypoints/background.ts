import "webext-dynamic-content-scripts";
import addPermissionToggle from "webext-permission-toggle";
import { Browser } from 'wxt/browser';

export default defineBackground(() => {
    addPermissionToggle();
    const parent = createCopyUrlAsContextMenu();

    browser.contextMenus.onClicked.addListener((info, tab) => {
        if (info.parentMenuItemId !== parent || !tab || !tab.id) return;

        switch (info.menuItemId) {
            case CopyPageLinkAsMdFormat.id:
                return copyPageLinkAs(tab, 'MD');
            case CopyPageLinkAsRstFormat.id:
                return copyPageLinkAs(tab, 'RST');
            case CopyImageLinkAsMdFormat.id:
                return copyImageLinkAs(info, tab.id, 'MD');
            case CopyImageLinkAsRstFormat.id:
                return copyImageLinkAs(info, tab.id, 'RST');
        }
    })
});

/**
 * create parent contextMenu and return id
 * @returns {string | number} The pareny contextmenu id
 */
function createCopyUrlAsContextMenu() {
    let parent = browser.contextMenus.create(CopyUrlAsParentContextMenu);

    childContextMenus.forEach((childContextMenu) => {
        browser.contextMenus.create({
            parentId: parent,
            ...childContextMenu
        })
    })

    return parent;
}

const CopyUrlAsParentContextMenu = {
    title: 'Copy url as >',
    id: 'copy-url-as-parent-context-menu',
    contexts: ['image', 'page'] as ['image', 'page'],
}

const CopyPageLinkAsMdFormat: Browser.contextMenus.CreateProperties = {
    id: 'copy-page-link-as-md-format',
    title: 'MD format',
    type: 'normal' as 'normal',
};

const CopyPageLinkAsRstFormat: Browser.contextMenus.CreateProperties = {
    id: 'copy-page-link-as-rst-format',
    title: 'RST format',
    type: 'normal' as 'normal',
};

const CopyImageLinkAsMdFormat: Browser.contextMenus.CreateProperties = {
    id: 'copy-image-link-as-md-format',
    title: 'MD format',
    contexts: ['image'] as ['image'],
    type: 'normal' as 'normal'
};


const CopyImageLinkAsRstFormat: Browser.contextMenus.CreateProperties = {
    id: 'copy-image-link-as-rst-format',
    title: 'RST format',
    contexts: ['image'] as ['image'],
    type: 'normal' as 'normal'
};

const childContextMenus = [
    CopyPageLinkAsMdFormat,
    CopyPageLinkAsRstFormat,
    CopyImageLinkAsMdFormat,
    CopyImageLinkAsRstFormat
]

function copyPageLinkAs(tab: Browser.tabs.Tab, format: 'MD' | 'RST') {
    const pageLink = format === 'MD' ? `[${tab.title}](${tab.url})` : '`' + `${tab.title} <${tab.url}>` + '`_';
    browser.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        func: (pageLinkInner) => {
            navigator.clipboard.writeText(pageLinkInner);
        },
        args: [pageLink]
    })
}

function copyImageLinkAs(info: Browser.contextMenus.OnClickData, tabId: number, format: 'MD' | 'RST') {
    const srcUrl = info.srcUrl
    if (!srcUrl) return;
    browser.scripting.executeScript({
        target: { tabId: tabId },
        func: (srcUrlInner, formatInner) => {
            const img = document.querySelector(`img[src="${srcUrlInner}"]`) as HTMLImageElement;
            const imgAlt = img.alt || "null";
            const imgLink = formatInner === 'MD' ? `![${imgAlt}](${srcUrlInner})` : `
            .. image:: ${srcUrlInner}
                :alt: ${imgAlt}
            `;
            navigator.clipboard.writeText(imgLink)
        },
        args: [srcUrl, format]
    })
}