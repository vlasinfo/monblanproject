

# 🚀 **[Live demo](https://test3.vlasinfo.com/)**


## 🔧 Quick Start

1. Install dependencies
 ```shell
   npm i
   ```
2. Start development (static HTML mode)
 ```shell
   npm run dev:html
   ```
3. Build minified version for production
 ```shell
   npm run build:html
   ```   


## ⚙️ How it Works (Gulp Tasks)

| Task                 | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `npm run dev:html`   | Runs Gulp in **HTML mode**, compiles HTML includes, Sass, JS, and watches changes. |
| `npm run build:html` | Compiles and minifies all assets for production → `dist/`.                         |
| Sass                 | Compiles `src/scss/**/*.scss` → `dist/assets/css/`                                 |
| JS                   | Bundles and minifies `src/js/**/*.js` → `dist/assets/js/`                          |
| Images               | Optimizes images from `src/img/` → `dist/assets/img/`                              |
| HTML                 | html files `src/html/` and html partials from `src/html/partials/` → `dist/`       |


## 📁 Folder Structure Overview

```
📁src/
├─ 📁scss/        # Styles
├─ 📁js/          # Scripts
├─ 📁img/         # Images
├─ 📁html/        # HTML files
│  └─ 📁partials/ # HTML includes
📁dist/           # Compiled files for production

```