# LINKSTATE Browser

so basically LINKSTATE Browser is a project i made to make sharing websites easier.

normally if you wanna share a website project with someone you have to deal with github, git, hosting and other stuff which is kinda annoying specially for beginners.

with LINKSTATE Browser you can just upload your website folder and turn it into a single link or a `.onestate` file and share it with others. they can open it in LINKSTATE Browser and view the project without needing any normal web hosting.

features:-

- upload HTML, CSS, JS files and assets like images, fonts and 3D models and pack them all together.
- save projects locally using custom `.linkstate` aliases so you can open them anytime.
- supports bundling images, SVGs and 3D models using Base64 data URLs.
- extract source files from supported unlocked `.onestate` files.
- customize the browser with themes, colors, wallpapers and an interactive background.
- supports desktop features like `.onestate` file association on Windows.

how it works?

1. upload your website folder.
2. LINKSTATE packs the files into a link or `.onestate` file.
3. share it with someone.
4. they open it in LINKSTATE Browser and run the project offline.

no need to setup hosting just to share a simple website.

future plans:-

i still wanna add more stuff to this project like support for more file types and bigger projects.

also planning to add a code editor inside the browser with an AI coding assistant so users can write and edit code directly without switching between different apps.

another idea is locked `.onestate` files which will let people run projects offline without showing the original source code.

to run it locally:

```bash
git clone https://github.com/Duskled/LinkState---Browser.git
cd LinkState---Browser
npm install
npm start
```

to build the app use `npm run make`.

made by Aman Singh ([@Duskled](https://github.com/Duskled))

still a prototype for now, but theres more stuff i wanna do with it.
