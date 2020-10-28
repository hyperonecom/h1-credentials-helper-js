# H1-credentials-helper-ts

## Installation

This library can be installed using package manager such as
[npm](https://www.npmjs.com/get-npm), or [yarn](https://yarnpkg.com/),
or compiled (transpiled) from sources.

### npm

```shell
npm i @hyperone/credentials
```

### yarn

```shell
yarn add @hyperone/credentials
```

### Compiling from sources

1. Clone repository:

   ```shell
   git clone https://github.com/hyperonecom/h1-credentials-helper-ts
   ```

2. Continue to directory

   ```shell
   cd h1-credentials-helper-ts
   ```

3. Install dependencies

   [Yarn](https://yarnpkg.com/) is the preffered way of getting dependencies.

   ```shell
   yarn
   ```

4. Build project

   ```shell
   yarn build
   ```

   Library output should be saved to `dist` directory.

## Providers

### Passport provider

Passport provider is based on passport file which can be generated using [h1-cli](https://github.com/hyperonecom/h1-cli).

#### Usage

```typescript
import { getPassportCredentialsHelper } from "@hyperone/credentials";

const authProvider = getPassportCredentialsHelper();
const jwt = authProvider.getToken("https://api.hyperone.com/v2");
```
