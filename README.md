# Config-Manager

[![npm](https://img.shields.io/npm/v/@allohamora/config-manager)](https://www.npmjs.com/package/@allohamora/config-manager)
![build](https://github.com/allohamora/config-manager/actions/workflows/build.yml/badge.svg)
![test](https://github.com/allohamora/config-manager/actions/workflows/test.yml/badge.svg)
![release](https://github.com/allohamora/config-manager/actions/workflows/release.yml/badge.svg)

This package contains managers for creating configs in a type-safe and stylish way.

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
import { ConfigManager, EnvManager } from '@allohamora/config-manager';

const env = new EnvManager();
const config = new ConfigManager({
  load: () => ({
    auth: {
      email: env.pick('AUTH_EMAIL').default('example@example.com').value(), // string
      password: env.get('AUTH_PASSWORD'), // string or the validation error,
    },
  }),
});

config.getOrThrow('auth'); // { email: string, password?: string }
config.get('auth.email'); // string
config.get('auth.password'); // string | undefined
config.getOrThrow('auth.password'); // string or the validation error
```
