# Coding Assistant Bot Usage Examples

This document provides examples of how to use the coding assistant bot with various intents.

## Table of Contents

- [Start and Stop the App](#start-and-stop-the-app)
- [Generate Component](#generate-component)
- [Generate Text File](#generate-text-file)
- [Generate File with Extension](#generate-file-with-extension)
- [Edit File](#edit-file)
- [Setup Project](#setup-project)
  - [Setup Nest Project](#setup-nest-project)
  - [Setup React Project](#setup-react-project)
- [Install Dependencies](#install-dependencies)
- [Run Build](#run-build)
- [Review Code](#review-code)
- [File Operations](#file-operations)
  - [Delete File](#delete-file)
  - [Rename File](#rename-file)
  - [Copy File](#copy-file)
  - [Move File](#move-file)

## Start and Stop the App

To start the app, use the following command:

```bash
npm start
```

To stop the app, type `@stop` in the terminal.

## Generate Component

The following examples demonstrate how to generate a `Header` component in different frameworks. The `Header` component displays a simple header with a title and navigation elements.

**User Input:**
```
Generate a React component named ReactHeader in js with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
```

**Bot Response:**
```json
{
  "intent": "generateComponent",
  "componentName": "Header",
  "folderPath": "src/components",
  "framework": "React",
  "fileExtension": "tsx",
  "content": "import React from 'react';\n\nconst Header = () => {\n  return (\n    <header>\n      <h1>Header Component</h1>\n      <nav>\n        <ul>\n          <li><a href=\"#home\">Home</a></li>\n          <li><a href=\"#about\">About</a></li>\n          <li><a href=\"#contact\">Contact</a></li>\n        </ul>\n      </nav>\n    </header>\n  );\n};\n\nexport default Header;"
}
```

**User Input:**
```
Generate a Vue component named VueHeader with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
```

**Bot Response:**
```json
{
  "intent": "generateComponent",
  "componentName": "Header",
  "folderPath": "src/components",
  "framework": "Vue",
  "fileExtension": "vue",
  "content": "<template>\n  <header>\n    <h1>Header Component</h1>\n    <nav>\n      <ul>\n        <li><a href=\"#home\">Home</a></li>\n        <li><a href=\"#about\">About</a></li>\n        <li><a href=\"#contact\">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n</template>\n\n<script>\nexport default {\n  name: 'Header'\n};\n</script>\n\n<style scoped>\n/* Add your styles here */\n</style>"
}
```

**User Input:**
```
Generate an Angular component named AngularHeader with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
```

**Bot Response:**
```json
{
  "intent": "generateComponent",
  "componentName": "Header",
  "folderPath": "src/components",
  "framework": "Angular",
  "fileExtension": "ts",
  "content": "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-header',\n  template: `<header>\n    <h1>Header Component</h1>\n    <nav>\n      <ul>\n        <li><a href=\"#home\">Home</a></li>\n        <li><a href=\"#about\">About</a></li>\n        <li><a href=\"#contact\">Contact</a></li>\n      </ul>\n    </nav>\n  </header>`,\n  styles: [`\n    /* Add your styles here */\n  `]\n})\nexport class HeaderComponent {}"
}
```

**User Input:**
```
Generate a Python component named pyHeader with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
```

**Bot Response:**
```json
{
  "intent": "generateComponent",
  "componentName": "Header",
  "folderPath": "src/components",
  "framework": "Python",
  "fileExtension": "py",
  "content": "class Header:\n    def __init__(self):\n        self.content = '''\n        <header>\n            <h1>Header Component</h1>\n            <nav>\n                <ul>\n                    <li><a href=\"#home\">Home</a></li>\n                    <li><a href=\"#about\">About</a></li>\n                    <li><a href=\"#contact\">Contact</a></li>\n                </ul>\n            </nav>\n        </header>\n        '''\n\n    def render(self):\n        return self.content"
}
```

## Generate Text File

The following example demonstrates how to generate a text file with detailed content based on the user's request.

**User Input:**
```
Create a text file named instruction in the src/components folder with detailed driving instructions on how to drive safe.
```

**Bot Response:**
```json
{
  "intent": "generateTextFile",
  "fileName": "instruction",
  "folderPath": "src/components",
  "content": "Detailed driving instructions based on the user's request."
}
```

## Generate File with Extension

**User Input:**
```
Create a YAML configuration file for GitHub workflow named config in the src/config folder.
```

**Bot Response:**
```json
{
  "intent": "generateFileWithExtension",
  "fileName": "config",
  "fileExtension": "yml",
  "folderPath": "src/config",
  "content": "Configuration settings for GitHub workflow based on the user's request."
}
```

## Edit File

**User Input:**
```
Edit the file src\components\ReactHeader.tsx to add more li elements.
```

**Bot Response:**
```json
{
  "intent": "editFile",
  "filePath": "src/api/userService.ts",
  "instructions": "Fix the backend API for user authentication."
}
```

## Setup Project

### Setup Nest Project

**User Input:**
```
Setup a new Nest project named MyNestApp in the E:/Texagon/testing directory.
```

**Bot Response:**
```json
{
  "intent": "setupNestProject",
  "directory": "E:/Texagon/testing",
  "appName": "MyNestApp"
}
```

### Setup React Project

**User Input:**
```
Setup a new React project named MyApp in the E:/Texagon/testing directory.
```

**Bot Response:**
```json
{
  "intent": "setupReactProject",
  "directory": "E:/Texagon/testing",
  "appName": "MyApp"
}
```

## Install Dependencies

**User Input:**
```
Install dependencies in the E:/Texagon/testing directory using npm.
```

**Bot Response:**
```json
{
  "intent": "installDependencies",
  "directory": "E:/Texagon/testing",
  "packageManager": "npm"
}
```

## Run Build

**User Input:**
```
Run the build command in the E:/Texagon/testing directory.
```

**Bot Response:**
```json
{
  "intent": "runBuild",
  "directory": "E:/Texagon/testing",
  "buildCommand": "npm run build"
}
```

## Review Code

The following example demonstrates how to review the code in a specified directory.

**User Input:**
```
Review the code in the src\code-generator directory.
```

**Bot Response:**
```json
{
  "intent": "reviewCode",
  "directory": "src/components"
}
```

## File Operations

### Delete File

**User Input:**
```
Delete the file src/components/ReactHeader.js.
```

**Bot Response:**
```json
{
  "intent": "delete",
  "filePath": "src/components/ReactHeader.js"
}
```

### Rename File

**User Input:**
```
Rename the file src\components\ReactHeader.js" to ReactHeaderRenamed.js.
```

**Bot Response:**
```json
{
  "intent": "rename",
  "oldPath": "src\components\ReactHeader.js",
  "newPath": "src/components/ReactHeaderRenamed.js"
}
```

### Copy File

**User Input:**
```
Copy the file src/components/ReactHeader.js to src/ReactHeader.js
```

**Bot Response:**
```json
{
  "intent": "copy",
  "sourcePath": "src/components/Component.tsx",
  "destinationPath": "src/components/ComponentCopy.tsx"
}
```

### Move File

**User Input:**
```
Move the file src/components/ReactHeader.js to src/ReactHeader.js.
```

**Bot Response:**
```json
{
  "intent": "move",
  "sourcePath": "src/components/ReactHeader.js",
  "destinationPath": "src/ReactHeader.js"
}
```


