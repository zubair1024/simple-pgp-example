// encrypt.js
const openpgp = require("openpgp");
const fs = require("fs");

const publicKeyArmored = fs.readFileSync("./public.key");

(async () => {
  const plainData = fs.readFileSync("secret.txt");
  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(plainData),
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
  });

  fs.writeFileSync("encrypted-secret.txt", encrypted.data);
  console.log(`data has been encrypted...`);
})();
