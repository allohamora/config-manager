# Config-Manager

[![npm](https://img.shields.io/npm/v/@allohamora/config-manager)](https://www.npmjs.com/package/@allohamora/config-manager)
![build](https://github.com/allohamora/config-manager/actions/workflows/build.yml/badge.svg)
![test](https://github.com/allohamora/config-manager/actions/workflows/test.yml/badge.svg)
![release](https://github.com/allohamora/config-manager/actions/workflows/release.yml/badge.svg)

The [Allohamora](https://github.com/allohamora) config-manager is a common utility to manage a config object with type and runtime guards

## Requirements

```json
{
  "node": ">=18.14.0",
  "npm": ">=9.3.1"
}
```

## Install

```bash
npm i @allohamora/config-manager
```

## Usage

```typescript
import { ConfigManager } from '@allohamora/config-manager';

const configManager = new ConfigManager({
  load: () => ({ secret: 'secret' }),
});

configManager.getOrThrow('secret'); // string
configManager.getOrThrow('unknown'); // typescript + runtime error
```
