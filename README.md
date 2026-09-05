
<!-- PROJECT LOGO -->
<p align="center">
  <img src="https://github.com/Sazizi2025/DocForge/blob/main/public/top.png?raw=true" alt="DocForge Logo" width="150" />
</p>

<h1 align="center">📘 DocForge</h1>

[![Website](https://img.shields.io/badge/Website-DocForge-blue?style=for-the-badge)](https://sazizi2025.github.io/DocForge/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/Sazizi2025/DocForge?style=for-the-badge)](https://github.com/Sazizi2025/DocForge/releases)
[![Stars](https://img.shields.io/github/stars/Sazizi2025/DocForge?style=for-the-badge)](https://github.com/Sazizi2025/DocForge/stargazers)

<p align="center">
  <p align="center">
    A comprehensive tool for generating, editing, translating, and improving README files
    <br />
    <a href="https://sazizi2025.github.io/DocForge/"><strong>View Online Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Sazizi2025/DocForge/issues">Report Bug</a>
    ·
    <a href="https://github.com/Sazizi2025/DocForge/issues">Request Feature</a>
  </p>
</p>

---

## 📖 About The Project

**DocForge** is an open-source, powerful tool for generating, editing, translating, and enhancing README files for software projects. It helps developers create beautiful, standard documentation without deep knowledge of Markdown.

The project consists of two main parts:
- **CLI (Rust):** for terminal use and automation
- **Web App (React):** modern, glassmorphism UI with full features

---

## ✨ Features

### 🌐 Web App
- Markdown editor with live preview
- Auto-save to browser localStorage (offline persistence)
- Dark/Light mode
- Resizable panes (drag splitter)
- Formatting toolbar: headings, bold, italic, lists, links, images, blockquotes, etc.
- Text alignment (left, center, right) with smart heading-to-HTML conversion
- Text color and font size customization
- Insert anchors for internal links
- Badge generator with preview
- Table builder (manual or CSV)
- Choose from 12+ ready-made templates
- Automatic translation to 50+ languages with preservation of code blocks and HTML
- Translate selected text only
- README quality check with scoring
- AI-generated README (OpenRouter + free model)
- Insert pre-written sections (About, Getting Started, Roadmap, License, etc.)
- Download final Markdown file

### 💻 CLI (Rust)
- Generate README from templates
- Add badges and tables
- Translate with automatic chunking for long texts
- Preserve code blocks during translation
- Works offline for basic generation

---

## 🚀 Demo

Online version: [https://sazizi2025.github.io/DocForge/](https://sazizi2025.github.io/DocForge/)

---

## 🛠️ Installation

### Prerequisites
- Node.js (version 20 or higher) for web app
- Rust (optional, for CLI)

### Web App Setup

```bash
git clone https://github.com/Sazizi2025/DocForge.git
cd DocForge
npm install
npm run dev
```
### CLI Setup

```bash
cargo install --path docforge-cli
# Or from the CLI folder:
cargo build --release
```
---

## 📚 Usage

### Web App
1. Start writing in the editor or choose a template.
2. Use the toolbar to add components (badges, tables, sections).
3. To translate, select specific text or translate the whole document.
4. Check README quality and make improvements.
5. Download the final Markdown file.

### CLI

```bash
# Generate README from template
docforge init --name MyProject --description "Project description" --template default

# Add a badge
docforge add-badge --label build --message passing --color green

# Add a table from CSV
docforge add-table --csv data.csv

# Translate README
docforge translate --from en --to fa
```
---

## 🧩 Architecture

- *Core*: Rust (CLI) + React/TypeScript (Web)
- *Translation*: MyMemory API (free)
- *AI*: OpenRouter (model: nvidia/nemotron-3.5-lightning:free)
- *Deployment*: GitHub Pages + Cloudflare Worker (secure proxy for API keys)
- *Styling*: Tailwind CSS v4 + Glassmorphism

---

## 🤝 Contributing

Contributions are always welcome! To contribute:

1. Fork the project
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License. See  for details.

---

## 🙏 Acknowledgments

- [shields.io](https://shields.io/) for badges
- [MyMemory](https://mymemory.translated.net/) for translation
- [OpenRouter](https://openrouter.ai/) for AI
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for icons
- [marked](https://marked.js.org/) for Markdown rendering
- [highlight.js](https://highlightjs.org/) for code highlighting
