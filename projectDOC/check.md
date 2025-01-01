# Coding Assistant Bot Usage Examples

This document provides examples of how to use the coding assistant bot with various intents.

## Generate Component

The following examples demonstrate how to generate a `Header` component in different frameworks. The `Header` component displays a simple header with a title and navigation elements.

**User Input:**
```
Generate a React component named Header with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
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
Generate a Vue component named Header with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
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
Generate an Angular component named Header with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
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
Generate a JavaScript component named Header with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
```

**Bot Response:**
```json
{
  "intent": "generateComponent",
  "componentName": "Header",
  "folderPath": "src/components",
  "framework": "JavaScript",
  "fileExtension": "js",
  "content": "class Header extends HTMLElement {\n  connectedCallback() {\n    this.innerHTML = `\n      <header>\n        <h1>Header Component</h1>\n        <nav>\n          <ul>\n            <li><a href=\"#home\">Home</a></li>\n            <li><a href=\"#about\">About</a></li>\n            <li><a href=\"#contact\">Contact</a></li>\n          </ul>\n        </nav>\n      </header>\n    `;\n  }\n}\ncustomElements.define('app-header', Header);"
}
```

**User Input:**
```
Generate a Python component named Header with navigation elements in the src/components folder. Include placeholders for navigation links and styles.
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
Create a text file named instruction in the src/components folder with detailed driving instructions.
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
Edit the file src/api/userService.ts to fix the backend API for user authentication.
```

**Bot Response:**
```json
{
  "intent": "editFile",
  "filePath": "src/api/userService.ts",
  "instructions": "Fix the backend API for user authentication."
}
```

## Setup Nest Project

**User Input:**
```
Setup a new Nest project in the my-nest-app directory.
```

**Bot Response:**
```json
{
  "intent": "setupNestProject",
  "directory": "my-nest-app"
}
```

## Review Code

**User Input:**
```
Review the code in the src/components directory.
```

**Bot Response:**
```json
{
  "intent": "reviewCode",
  "directory": "src/components"
}
```

## Delete File

**User Input:**
```
Delete the file src/components/OldComponent.tsx.
```

**Bot Response:**
```json
{
  "intent": "delete",
  "filePath": "src/components/OldComponent.tsx"
}
```

## Rename File

**User Input:**
```
Rename the file src/components/OldComponent.tsx to src/components/NewComponent.tsx.
```

**Bot Response:**
```json
{
  "intent": "rename",
  "oldPath": "src/components/OldComponent.tsx",
  "newPath": "src/components/NewComponent.tsx"
}
```

## Copy File

**User Input:**
```
Copy the file src/components/Component.tsx to src/components/ComponentCopy.tsx.
```

**Bot Response:**
```json
{
  "intent": "copy",
  "sourcePath": "src/components/Component.tsx",
  "destinationPath": "src/components/ComponentCopy.tsx"
}
```

## Execute Command

**User Input:**
```
Execute the command ls with arguments -la.
```

**Bot Response:**
```json
{
  "intent": "execute",
  "command": "ls",
  "args": ["-la"]
}
```
