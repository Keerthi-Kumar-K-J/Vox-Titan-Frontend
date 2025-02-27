# VoxTitan Frontend

VoxTitan is a voice-enabled AI chatbot powered by Together.ai's advanced language models. This repository contains the frontend code for VoxTitan, built using React and deployed on Netlify.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
  - [Netlify](#netlify)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features
- **AI-Powered Chat**: Integrates with the VoxTitan backend for natural language processing.
- **Voice Integration**: Supports voice-based interactions with wake-word detection.
- **Code Display**: Displays code snippets with syntax highlighting.
- **Text-to-Speech**: Converts AI responses into speech with enhanced TTS settings.
- **Copy to Clipboard**: Allows users to copy AI responses to the clipboard.

## Technologies Used
- **React**: JavaScript library for building the user interface.
- **React Markdown**: Renders markdown content (e.g., code blocks).
- **React Syntax Highlighter**: Adds syntax highlighting to code snippets.
- **Netlify**: Cloud platform for hosting the frontend.
- **Web Speech API**: Enables voice recognition and text-to-speech functionality.

## Setup
### Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js 16+**: [Download Node.js](https://nodejs.org/)
- **npm**: Node package manager (comes with Node.js).
- **Git**: [Download Git](https://git-scm.com/downloads)

### Installation
#### Clone the Repository:
```sh
git clone https://github.com/your-username/VoxTitan-Frontend.git
cd VoxTitan-Frontend
```

#### Install Dependencies:
```sh
npm install
```

## Available Scripts
### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
Ejects the configuration files if you need more customization (irreversible action).

## Configuration
### Environment Variables
Create a `.env` file in the root directory and add the following variables:
```sh
REACT_APP_BACKEND_URL=https://vox-titan-backend.onrender.com
```

## Deployment
### Netlify
#### Sign Up:
- Create an account on [Netlify](https://www.netlify.com/).

#### Create a New Site:
1. Connect your GitHub repository.
2. Select the branch to deploy (e.g., `main`).

#### Configure Build Settings:
- **Build command**: `npm run build`
- **Publish directory**: `build/`

#### Deploy:
- Netlify will automatically build and deploy your frontend.

## Contributing
We welcome contributions! Here’s how you can help:

#### Fork the Repository:
```sh
git clone https://github.com/your-username/VoxTitan-Frontend.git
```

#### Create a Branch:
```sh
git checkout -b feature/your-feature-name
```

#### Commit Your Changes:
```sh
git commit -m "Add your feature"
```

#### Push to the Branch:
```sh
git push origin feature/your-feature-name
```

#### Open a Pull Request:
- Describe your changes and submit the PR.

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **Together.ai**: For providing the AI models.
- **React**: For the powerful and flexible frontend library.
- **Netlify**: For seamless deployment and hosting.

## Contact
For questions or feedback, feel free to reach out:

- **Email**: 24ec069@kpriet.ac.in
- **GitHub**: [Keerthi-Kumar-K-J](https://github.com/Keerthi-Kumar-K-J)
