<!-- PROJECT SHIELDS -->
[![Website](https://img.shields.io/badge/Website-DocForge-blue?style=for-the-badge)](https://sazizi2025.github.io/DocForge/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/Sazizi2025/DocForge?style=for-the-badge)](https://github.com/Sazizi2025/DocForge/releases)
[![Stars](https://img.shields.io/github/stars/Sazizi2025/DocForge?style=for-the-badge)](https://github.com/Sazizi2025/DocForge/stargazers)

<!-- PROJECT LOGO -->
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
CLI Setup
```bash
cargo install --path docforge-cli
# Or from the CLI folder:
cargo build --release
```
📚 Usage
Web App
Start writing in the editor or choose a template.

Use the toolbar to add components (badges, tables, sections).

To translate, select specific text or translate the whole document.

Check README quality and make improvements.

Download the final Markdown file.

CLI
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
🧩 Architecture
Core: Rust (CLI) + React/TypeScript (Web)
Translation: MyMemory API (free)
AI: OpenRouter (model: nvidia/nemotron-3.5-lightning:free)
Deployment: GitHub Pages + Cloudflare Worker (secure proxy for API keys)
Styling: Tailwind CSS v4 + Glassmorphism

🤝 Contributing
Contributions are always welcome! To contribute:
Fork the project
Create a new branch
Make your changes
Submit a pull request

📄 License
This project is licensed under the MIT License. See LICENSE for details.

🙏 Acknowledgments
shields.io for badges
MyMemory for translation
OpenRouter for AI
Tailwind CSS for styling
Lucide Icons for icons
marked for Markdown rendering
highlight.js for code highlighting


This README is ready for your repository. Once it’s live, you can use **DocForge** itself to generate translations in Persian or any other language! 🚀
