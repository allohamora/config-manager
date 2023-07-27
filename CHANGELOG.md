# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.7.0](https://github.com/allohamora/config-manager/compare/0.6.0...0.7.0) (2023-07-27)

### Features

- add rest to envRecord ([2d57b5d](https://github.com/allohamora/config-manager/commit/2d57b5d4e9ce2555cafd5b302ce0b4195c1b4a83))
- improve defaultFor with rest return value ([304530d](https://github.com/allohamora/config-manager/commit/304530d2106ac0575fe06cc8a532be48e441d924))
- improve orThrow methods typing ([d7f7590](https://github.com/allohamora/config-manager/commit/d7f7590e3ee04eef31edeb028752105056982346))

## [0.6.0](https://github.com/allohamora/config-manager/compare/0.5.2...0.6.0) (2023-04-13)

### ⚠ BREAKING CHANGES

- replace load method with get + type

### Features

- replace load method with get + type ([3c2a8c2](https://github.com/allohamora/config-manager/commit/3c2a8c236ea815c46483cfbe0a9306450d3c04e7))

### [0.5.2](https://github.com/allohamora/config-manager/compare/0.5.1...0.5.2) (2023-04-11)

### Features

- add more keywords ([0e18525](https://github.com/allohamora/config-manager/commit/0e185259f70f2717f208c3cee6d6781d23646e4c))

### [0.5.1](https://github.com/allohamora/config-manager/compare/0.5.0...0.5.1) (2023-04-11)

### Features

- update README.md to fix missing README.md in npm ([666dcaf](https://github.com/allohamora/config-manager/commit/666dcaf614c9813ccad0bdf5d6b4fab22b3563dc))

## [0.5.0](https://github.com/allohamora/config-manager/compare/0.4.0...0.5.0) (2023-04-11)

### ⚠ BREAKING CHANGES

- pickFor now every time returns EnvPicker

### Features

- pickFor now every time returns EnvPicker ([e688443](https://github.com/allohamora/config-manager/commit/e688443b8f845bb7a5049d2e3663d3c87d0c7390))

## [0.4.0](https://github.com/allohamora/config-manager/compare/0.3.0...0.4.0) (2023-04-10)

### Features

- add atLeastOne to for methods ([1b43a5f](https://github.com/allohamora/config-manager/commit/1b43a5f01bf231d7f4935d62b0d7581b080f94d1))
- add EnvPicker export ([9d03bc8](https://github.com/allohamora/config-manager/commit/9d03bc874e0d65416a18ac1b0f3a02af915fbcf0))
- add getFor and getForOrThrow ([51dbf8c](https://github.com/allohamora/config-manager/commit/51dbf8c2c98af632758ce2dcd9e866d184207066))
- add pickFor and pickForOrThrow ([689b5ba](https://github.com/allohamora/config-manager/commit/689b5baabe7acf9c88ae25d668d60deca31b9649))
- improve nodeEnv typings ([3673a1d](https://github.com/allohamora/config-manager/commit/3673a1da2baeba6a0f462f671fa5ec2f99981a8a))

### Bug Fixes

- rename mapIfExist to mapIfExists ([2d1c8e4](https://github.com/allohamora/config-manager/commit/2d1c8e4fb0a7b0d22ff61a23434fdf142e7cf19f))

## [0.3.0](https://github.com/allohamora/config-manager/compare/0.2.2...0.3.0) (2023-04-08)

### Features

- add support for not plain objects ([a45151f](https://github.com/allohamora/config-manager/commit/a45151f809540db7d019631123ebbba43568e9e8))

### [0.2.2](https://github.com/allohamora/config-manager/compare/0.2.1...0.2.2) (2023-04-08)

### Features

- update README.md ([2d504ad](https://github.com/allohamora/config-manager/commit/2d504ad024113909f832be252ee1583d070cb896))

### [0.2.1](https://github.com/allohamora/config-manager/compare/0.2.0...0.2.1) (2023-04-08)

### Features

- update keyword in package.json ([5356003](https://github.com/allohamora/config-manager/commit/5356003a3b519ffc5b46c98202d9f16b83a5a304))
- update README.md ([cef9d6c](https://github.com/allohamora/config-manager/commit/cef9d6c56f39127fd735aeab3aa2d4a6a3df6434))

## [0.2.0](https://github.com/allohamora/config-manager/compare/0.1.2...0.2.0) (2023-04-08)

### Features

- add env-manager and env-picker ([30e2dcb](https://github.com/allohamora/config-manager/commit/30e2dcbbc637891d18272116b4186b3ea5035565))
- add mapIfExist to env-picker ([f40413c](https://github.com/allohamora/config-manager/commit/f40413c9efa40a6d16fcfbae0bed9b1b64c0029b))
- add null or undefined check to getOrThrow ([66da1ee](https://github.com/allohamora/config-manager/commit/66da1ee7d35110a05fc5afcab8b2ce1f7e240994))
- add trim to pickOrThrow ([ff16658](https://github.com/allohamora/config-manager/commit/ff16658f4669215ecd7d5c4c50c5a47d6e5e1c63))
- improve env-picker default typings ([39fefc8](https://github.com/allohamora/config-manager/commit/39fefc8c654f158680295bbc25fbb034a5c28f0e))

### Bug Fixes

- add correct typing to manager methods ([f05bbae](https://github.com/allohamora/config-manager/commit/f05bbae391e899fa3a31301ce3ffeee1db51e331))
- fix incorrect default value changing ([57aa7a0](https://github.com/allohamora/config-manager/commit/57aa7a095d66586e9ccebc82e93ddf3feed54046))

### [0.1.2](https://github.com/allohamora/config-manager/compare/0.1.1...0.1.2) (2023-03-28)

### Bug Fixes

- fix cjs issues ([6adede0](https://github.com/allohamora/config-manager/commit/6adede01834b01edbacb4bf71eea8238badae3f2))

### [0.1.1](https://github.com/allohamora/config-manager/compare/0.1.0...0.1.1) (2023-03-17)

### Bug Fixes

- add private modifier to config field ([10f038d](https://github.com/allohamora/config-manager/commit/10f038d6006c5c602fee7d2e16fd2bb09a12a741))

## [0.1.0](https://github.com/allohamora/config-manager/compare/0.0.1...0.1.0) (2023-03-07)

### Features

- add flatten config ([5d4b71d](https://github.com/allohamora/config-manager/commit/5d4b71d2ee318a22fd0c3e218833ec4d3b368949))

### 0.0.1 (2023-03-07)

### Features

- add ConfigManager ([0fde0c7](https://github.com/allohamora/config-manager/commit/0fde0c7f5e14204dfd88e460e809d996ebc0c5b0))
