import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-solid', '@wxt-dev/auto-icons'],
  manifest: {
    permissions: [
      'storage', 'scripting', 'activeTab', 'contextMenus', 'clipboardWrite'],
    optional_host_permissions: ["*://*/*"],
  }
});
