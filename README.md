# Copy URL As

A browser extension for Chrome, Edge, and Firefox that enables copying page or image links in Markdown or reStructuredText (reST) formats.

**Note**: This extension is not available on any official extension store.

## Download

Get the latest release from the [Releases page](https://github.com/un4gt/copy-url-as/releases) .

## Source Build

### Prerequisites
- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) (version 8.x or later recommended)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/un4gt/copy-url-as.git --depth 1 --branch main
   ```


2. **Navigate and Install Dependencies**
    ```bash
    cd copy-url-as
    pnpm install
    ```

3. **Build for Chrome/Edge**
    ```bash
    pnpm build
    ```


4. **Build for Firefox**
    ```bash
    pnpm zip:f
    ```


## Contributing

Feel free to submit issues or pull requests on the GitHub repository. Contributions are welcome!