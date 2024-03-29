# Clean Snippets

<p align="center">
  <img src="https://github.com/scmacoll/clean-snippets/assets/85879687/102fc0a4-9ef1-4e49-8939-d11aaebb7419" alt="Clean_Snippets_demo_video1">
</p>

## Overview
https://cleansnippets.com/ / Clean Snippets App (Mac)

Clean Snippets is a tool designed for developers looking to simplify and shorten their code snippets for more straightforward sharing, storing, or usage within prompts. It removes unnecessary components like comments, whitespace, and more based on user preferences.

## Features

- Clean and user-friendly interface for code input and viewing the cleaned code.
- Options to remove specific parts of the code, including comments, blank lines, whitespace, and others.
- Warnings about large code snippet sizes and how they might affect performance in different scenarios.
- Clipboard functionality for easy copying of the cleaned code.
- Character count for input and output to keep track of snippet sizes.

## How It Works

1. **Paste Code**: Users paste their code into the input area.
2. **Select Preferences**: Before cleaning, users can choose what elements they want to remove from their code. Options include comments, blank lines, imports, inline SVGs, whitespace, and line wrapping.
3. **Clean**: By pressing the "Clean" button, the app processes the input, removes the selected elements and reduces the number of characters contained in the code.
4. **Copy or Clear**: Users can immediately copy the cleaned code to their clipboard or clear the text area to start over. The application provides visual confirmation for these actions.

## Installation
### Web
No installation is necessary for the web application. Users need to navigate to the hosted website URL - https://cleansnippets.com/.
### Mac App (M chip)
To install the Mac application, follow these steps:

1. Navigate to the [Releases](https://github.com/scmacoll/clean-snippets/releases) page of this GitHub repository.
2. Look for the latest release and download the `.dmg` file associated with it.
3. Once downloaded, open the `.dmg` file.
4. Drag the application icon to your Applications folder to install the app.
5. Open your Applications folder and double-click on the app to run it.

Note: You might need to allow the application to run in your System Preferences if you get a security warning upon the first launch. This is common for applications downloaded outside of the Mac App Store.

---
Developers who wish to contribute to or modify the application's source code can clone the repository to their local machine.

```bash
git clone https://github.com/scmacoll/clean-snippets.com.git
```

After cloning, developers should move into the project directory and install any dependencies before making modifications.

```bash
cd clean-snippets
npm install
```

## Usage

Upon loading, the app is ready for use. Paste your code snippet into the designated area and select the elements to remove. After setting up, click "Clean" to get the final, cleaned-up code. The character counter informs users about the size of their snippets.

To copy the code, click the "Copy" button. If you want to clean a new snippet, click "Clear" to empty the text areas and start fresh.

## Contributing

I encourage developers to [contribute](CONTRIBUTING.md) to Clean Snippets. Whether it's a bug report, new feature, or suggestion for improvement, I welcome new ideas. Please fork the repository and use a feature branch before sending a pull request.

Code for the web app is all within the first parent directory whilst code for the Mac App is inside the macApp/ folder.

## Feedback

Your feedback is important for the continuous improvement of the tool. Please use the issue tracker for support requests or bug reports.

## License

Clean Snippets is available under the [MIT License](https://opensource.org/licenses/MIT). See the LICENSE file in the repository for more information.

## Acknowledgments

I want to thank everyone who has contributed to the development of Clean Snippets, as every contribution helps make this tool useful for developers worldwide.
