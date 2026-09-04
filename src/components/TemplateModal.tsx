import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface TemplateModalProps {
  onClose: () => void;
  onSelectTemplate: (content: string) => void;
}

const templates = [
  {
    name: 'Default',
    content: `# Project Name

Short description of your project.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

\`\`\`bash
git clone https://github.com/yourusername/project.git
\`\`\`

## Usage

Describe how to use your project.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
`,
  },
  {
    name: 'Python',
    content: `# Project Name

Description

![Python](https://img.shields.io/badge/python-3.8+-blue.svg)

## Features
- Feature 1
- Feature 2

## Installation

\`\`\`bash
pip install project-name
\`\`\`

## Usage

\`\`\`python
import project_name

# example usage
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'Blank',
    content: '',
  },

  {
    name: 'React',
    content: `# React Project

Short description of your React app.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### \`npm test\`

Launches the test runner in the interactive watch mode.

### \`npm run build\`

Builds the app for production to the \`build\` folder.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
`,
  },
  {
    name: 'Node.js',
    content: `# Node.js Project

Description of your Node.js application.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Environment Variables

To run this project, you will need to add the following environment variables:

\`API_KEY\`, \`DB_URL\`, \`PORT\`

## API Reference

#### Get all items

\`\`\`http
GET /api/items
\`\`\`

## Contributing

Contributions are always welcome! See \`CONTRIBUTING.md\` for ways to get started.

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'Rust',
    content: `# Rust Project

Description of your Rust project.

![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)

## Installation

\`\`\`bash
cargo install --path .
\`\`\`

## Usage

\`\`\`bash
my-binary --help
\`\`\`

## Development

\`\`\`bash
cargo build
cargo test
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'Go',
    content: `# Go Project

Description of your Go project.

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)

## Installation

\`\`\`bash
go get github.com/yourusername/yourproject
\`\`\`

## Usage

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## Build

\`\`\`bash
go build -o myapp .
\`\`\`

## Contributing

Pull requests are welcome. Please open an issue first to discuss any changes.

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'API Service',
    content: `# API Service

REST API for [describe purpose].

![API](https://img.shields.io/badge/API-REST-important?style=for-the-badge)

## Base URL

\`\`\`
https://api.example.com/v1
\`\`\`

## Endpoints

| Method | Endpoint       | Description          | Auth |
|--------|----------------|----------------------|------|
| GET    | /items         | List all items       | No   |
| POST   | /items         | Create a new item    | Yes  |
| GET    | /items/{id}    | Get a single item    | No   |
| PUT    | /items/{id}    | Update an item       | Yes  |
| DELETE | /items/{id}    | Delete an item       | Yes  |

## Authentication

Use JWT Bearer tokens. Send in \`Authorization\` header: \`Bearer <token>\`.

## Error Codes

- \`400\`: Bad Request
- \`401\`: Unauthorized
- \`403\`: Forbidden
- \`404\`: Not Found
- \`500\`: Internal Server Error

## Usage

\`\`\`bash
curl -X GET https://api.example.com/v1/items
\`\`\`

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'CLI Tool',
    content: `# CLI Tool

A command-line tool for [describe purpose].

![CLI](https://img.shields.io/badge/CLI-Tool-blue?style=for-the-badge)

## Installation

\`\`\`bash
npm install -g my-cli
\`\`\`

## Commands

\`\`\`
Usage: my-cli [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init [name]     Initialize a new project
  build           Build the project
  serve [port]    Start a development server
\`\`\`

## Examples

\`\`\`bash
my-cli init my-app
my-cli build
my-cli serve 8080
\`\`\`

## Configuration

Create a \`.my-clirc\` file in your home directory.

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'Machine Learning',
    content: `# Machine Learning Project

Description of your ML project.

![ML](https://img.shields.io/badge/Machine%20Learning-Data%20Science-blueviolet?style=for-the-badge)

## Dataset

- Source: [link](https://example.com/dataset)
- Size: 10,000 samples
- Features: list of features

## Model

- Algorithm: Random Forest / Neural Network etc.
- Accuracy: 95%

## Training

\`\`\`bash
python train.py --epochs 50
\`\`\`

## Evaluation

\`\`\`bash
python evaluate.py --model checkpoints/best.pth
\`\`\`

## Results

| Metric   | Value |
|----------|-------|
| Accuracy | 95%   |
| F1 Score | 0.94  |

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'Documentation',
    content: `# Documentation

Welcome to the documentation for **Project Name**.

## Getting Started

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Run documentation locally:

\`\`\`bash
npm run docs:dev
\`\`\`

## Structure

- \`docs/guide\`: User guide
- \`docs/api\`: API reference
- \`docs/tutorial\`: Step-by-step tutorials

## Contributing to Docs

1. Fork the repo
2. Create a branch
3. Make changes
4. Submit a PR

## License

[MIT](LICENSE)
`,
  },
  {
    name: 'DevOps / CI',
    content: `# DevOps Project

Infrastructure as Code and CI/CD pipelines.

![DevOps](https://img.shields.io/badge/DevOps-CI%2FCD-brightgreen?style=for-the-badge)

## Infrastructure

- Docker
- Kubernetes
- Terraform

## CI/CD Pipeline

- **Build**: Compile and package
- **Test**: Unit + integration
- **Deploy**: Staging → Production

## Configuration

Environment variables:

\`\`\`
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DOCKER_REGISTRY
\`\`\`

## Usage

\`\`\`bash
docker-compose up -d
\`\`\`

## License

[MIT](LICENSE)
`,
  },
];

export default function TemplateModal({ onClose, onSelectTemplate }: TemplateModalProps) {
  const handleSelect = (content: string) => {
    onSelectTemplate(content);
    toast.success('Template applied');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Choose Template</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {templates.map((template) => (
            <button
              key={template.name}
              onClick={() => handleSelect(template.content)}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <span className="font-medium text-gray-900 dark:text-white">{template.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}