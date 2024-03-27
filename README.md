# text-based-game

A GPT powered DnD CLI

## Pre-requisites

- [Node >= v20](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)

## Usage

1. Install packages

```sh
pnpm i
```

2. Create `.env`. See `./src/config.ts` for required variables.

3. Build package

```sh
pnpm build
```

4. Install CLI globally

```sh
pnpm link --global
```

5. Run CLI

```sh
tbg
```
