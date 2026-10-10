# LINKSTATE Browser

## The Paradigm Shift

For developers, especially beginners, sharing a frontend project traditionally means dealing with GitHub repositories, `git push/pull` workflows, complex local server setups, and cloud hosting configurations. It introduces massive friction just to show someone a prototype, a UI mockup, or a physics simulation.

**LINKSTATE Browser** completely compresses that deployment pipeline. By stripping away the steep learning curve of repositories and IDE setups, this environment puts the power of instant creation and seamless sharing back where it belongs: in your hands.

You upload your website folder, get a single portable link or a `.onestate` file, and share it anywhere. The receiver opens it directly in LINKSTATE Browser, with offline rendering and no traditional web hosting required.

## Core Features

- **Zero Deployment Friction**: Drag and drop your HTML/CSS/JS files, including images, fonts, and 3D assets. The browser automatically encodes everything into a standalone package. Share the link or the lightweight `.onestate` file.
- **Your Private Digital Library**: Bookmark projects directly into your local environment using custom `name.linkstate` aliases. Build a permanent, offline, and instantly accessible archive of web projects.
- **Universal Asset Bundling**: Images, SVGs, and 3D models (`.glb`, `.gltf`) can be converted into Base64 data URLs to keep assets bundled with the project.
- **Source Recovery**: Extract and rebuild source files from supported, unlocked `.onestate` packages directly to your local drive.
- **Developer-First Workspace**: A modern interface featuring asymmetrical grids, Brave-style personalization with custom themes, accent colors, wallpapers, and an ambient interactive canvas background.
- **Native OS Integration**: Supports installation through Squirrel, `.onestate` file associations on Windows, and remembering window dimensions across sessions.

## How It Works

1. **Package**: Drop your website folder into the LINKSTATE generator.
2. **Share**: The engine reads your files and bundles them into a shareable link or a downloadable `.onestate` file.
3. **Run**: The recipient opens the link or file in LINKSTATE Browser, which decodes the package and renders the website offline.

## Future Roadmap

This v3.0 prototype is just the beginning. We are rethinking how browsing, building, and sharing work.

- **Limitless Expansion**: Expand beyond standard frontend files to support more file types and asset-heavy digital environments.
- **The Ultimate Workspace (In-Browser IDE)**: Write, edit, and execute code directly inside the browser UI, with an integrated AI coding assistant. The viewer becomes the studio.
- **The Compiled Web (Locked `.onestate` Files)**: Develop packages that run offline while restricting access to their original source code, helping creators distribute projects without exposing their source files.

## Installation & Setup

To build and run the prototype locally:

```bash
# Clone the repository
git clone https://github.com/Duskled/LinkState---Browser.git

# Navigate into the directory
cd LinkState---Browser

# Install dependencies
npm install

# Start the browser in development mode
npm start

# Package the application for your OS
npm run make
```

## Author

Created by **Aman Singh** ([@Duskled](https://github.com/Duskled))

*Passionate about removing friction from development and rethinking how we interact with the web.*
