# Contributing

- [Get Started](#get-started)
  - [Setup](#setup)
- [IDEs](#ides)
  - [Recommended Visual Studio Code settings](#recommended-visual-studio-code-settings)

## Get Started

### Setup

```sh
yarn
yarn dev:setup
yarn dev:setup:vscode # Visual Studio Code
yarn dev:docker
yarn db:migrate
```

## IDEs

### Recommended Visual Studio Code settings

`.vscode/settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "eslint.codeActionsOnSave.mode": "all",
  "eslint.format.enable": true,
  "eslint.nodePath": ".yarn/sdks",
  "eslint.packageManager": "yarn",
  "prettier.prettierPath": ".yarn/sdks/prettier/index.js",
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  }
}
```
