import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface SectionModalProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

const sections = [
  {
    name: 'About The Project',
    content: `## About The Project\n\n[![Product Name Screen Shot][product-screenshot]](https://example.com)\n\nThere are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one.\n\nHere's why:\n* Your time should be focused on creating something amazing.\n* You shouldn't be doing the same tasks over and over like creating a README from scratch.\n* You should implement DRY principles to the rest of your life.`,
  },
  {
    name: 'Getting Started',
    content: `## Getting Started\n\nThis is an example of how you may give instructions on setting up your project locally.\nTo get a local copy up and running follow these simple example steps.\n\n### Prerequisites\n\nThis is an example of how to list things you need to use the software and how to install them.\n* npm\n  \`\`\`sh\n  npm install npm@latest -g\n  \`\`\`\n\n### Installation\n\n_Below is an example of how you can instruct your audience on installing and setting up your app._\n\n1. Get a free API Key at [https://example.com](https://example.com)\n2. Clone the repo\n   \`\`\`sh\n   git clone https://github.com/your_username/repo_name.git\n   \`\`\`\n3. Install NPM packages\n   \`\`\`sh\n   npm install\n   \`\`\``,
  },
  {
    name: 'Usage',
    content: `## Usage\n\nUse this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space.\n\n_For more examples, please refer to the [Documentation](https://example.com)_`,
  },
  {
    name: 'Roadmap',
    content: `## Roadmap\n\n- [x] Add Changelog\n- [x] Add back to top links\n- [ ] Add Additional Templates w/ Examples\n- [ ] Add "components" document to easily copy & paste sections of the readme\n- [ ] Multi-language Support\n    - [ ] Chinese\n    - [ ] Spanish\n\nSee the [open issues](https://github.com/your_username/repo_name/issues) for a full list of proposed features.`,
  },
  {
    name: 'Contributing',
    content: `## Contributing\n\nContributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.\n\nIf you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".\nDon't forget to give the project a star! Thanks again!\n\n1. Fork the Project\n2. Create your Feature Branch\n3. Commit your Changes\n4. Push to the Branch\n5. Open a Pull Request`,
  },
  {
    name: 'License',
    content: `## License\n\nDistributed under the MIT License. See \`LICENSE.txt\` for more information.`,
  },
  {
    name: 'Contact',
    content: `## Contact\n\nYour Name - [@your_twitter](https://twitter.com/your_username) - email@example.com\n\nProject Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)`,
  },
  {
    name: 'Acknowledgments',
    content: `## Acknowledgments\n\nUse this space to list resources you find helpful and would like to give credit to.\n\n* [Choose an Open Source License](https://choosealicense.com)\n* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)\n* [Img Shields](https://shields.io)\n* [GitHub Pages](https://pages.github.com)\n* [Font Awesome](https://fontawesome.com)\n* [React Icons](https://react-icons.github.io/react-icons/search)`,
  },
  {
    name: 'Table of Contents',
    content: `<details>
    <summary>Table of Contents</summary>
    <ol>
      <li>
        <a href="#about-the-project">About The Project</a>
        <ul>
          <li><a href="#built-with">Built With</a></li>
        </ul>
      </li>
      <li>
        <a href="#getting-started">Getting Started</a>
        <ul>
          <li><a href="#prerequisites">Prerequisites</a></li>
          <li><a href="#installation">Installation</a></li>
        </ul>
      </li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#roadmap">Roadmap</a></li>
      <li><a href="#contributing">Contributing</a></li>
      <li><a href="#license">License</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#acknowledgments">Acknowledgments</a></li>
    </ol>
  </details>`,
  }
];

export default function SectionModal({ onClose, onInsert }: SectionModalProps) {
  const handleSelect = (content: string) => {
    onInsert('\n\n' + content + '\n\n');
    toast.success('Section inserted');
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Insert Section</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => handleSelect(section.content)}
              className="w-full text-left px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/50 dark:hover:bg-gray-700/50 transition"
            >
              <span className="font-medium text-gray-900 dark:text-white">{section.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}