# taiwan-passport-name
A JavaScript implementation of a translator between a Chinese name and a Taiwanese passport name in English. For example, the npm can convert `韓國瑜` to his passport name `HAN, KUOYU`. The modules based itself on this [resolver](http://www.englishname.org/), which conforms to the **Wade–Giles system (WG)** used by [Taiwan R.O.C.](https://en.wikipedia.org/wiki/Taiwan).

## Installation
```
npm i -s taiwan-passport-name
```
## Example
```
const taiwan = require('taiwan-passport-name');

async function main() {
  console.log(await taiwan.translate("發大財"));
}

main();
```
## API Reference
- **translator**:
```
translate(chinese_name)
```