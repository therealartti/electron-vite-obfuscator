# electron-vite-obfuscator
An obfuscation extension to [electron-vite](https://github.com/alex8088/electron-vite)'s V8 Bytecode plugin  using [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).

## Install

```sh
npm i electron-vite-obfuscator -D
```

## Usage

Similarly to how the official Bytecode plugin works, use the plugin bytecodePlugin to enable bytecode protection:

```js
import { defineConfig } from 'electron-vite'
import { bytecodePlugin } from 'electron-vite-obfuscator'

export default defineConfig({
  main: {
    plugins: [bytecodePlugin()]
  },
  preload: {
    plugins: [bytecodePlugin()]
  },
  renderer: {
    // ...
  }
})
```

## Configure

To enable the javascript obfuscation, pass the wanted obfuscator settings in the obfuscationOptions object. Refer to the javascript-obfuscator [official documentation](https://github.com/javascript-obfuscator/javascript-obfuscator?tab=readme-ov-file#javascript-obfuscator-options) to see all possible options. 

```js
import { defineConfig } from 'electron-vite'
import { bytecodePlugin } from 'electron-vite-obfuscator'

export default defineConfig({
  main: {
    plugins: [
      bytecodePlugin({ 
        obfuscationOptions: { 
          //options go here 
        }
      })
    ]
  },
  preload: {
// ...
})
```

> [!IMPORTANT]  
> Both `selfDefending` and `debugProtection` depend on `Function.prototype.toString()`. According to the electron-vite [docs](https://electron-vite.org/guide/source-code-protection#impact-on-code-organization-and-writing), the function does not work due to bytecode's nature. Thus, `selfDefending` and `debugProtection` are enforced to `false`.

### Official bytecodePlugin Options

On top of `obfuscationOptions`, all official electron-vite bytecodePlugin options (`protectedStrings`, `transformArrowFunctions`, etc) **are** supported. They can be found [here](https://electron-vite.org/guide/source-code-protection#bytecodeplugin-options).

## FAQ

### Why make a separate npm package instead of a PR?

Based on my own understanding, having extra obfuscation supported is not in the roadmap of electron-vite. By making a separate package, I can improve and work on this without cluttering and making electron-vite deviate from its original purpose. Of course, if [alex.wei](https://github.com/alex8088) does want to include my changes, he's free to do so.

### Why use this package instead of another vite javascript-obfuscator plugin?

First of all, the obfuscation process is embedded in the bytecode transformation process. Therefore you are sure that everything works as it should, and when it should. Second of all, `stringArray` works perfectly compared to other modern alternatives that enforce it to `false`.

### Why doesn't my application work?

The larger the project, the more problems you stumble upon. Before submitting an issue, try playing around with the different javascript-obfuscator settings. 

## Support

- Create an [issue](https://github.com/therealartti/electron-vite-obfuscator/issues)