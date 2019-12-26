const taiwan = require('./index.js');

// console.log(taiwan.translate("胡耀傑"));

async function main() {
  console.log(await taiwan.translate("韓國瑜"));
  // console.log(await taiwan.translateViaWeb("韓國瑜"));
}

main();