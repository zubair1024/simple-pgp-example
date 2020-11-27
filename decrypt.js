// decrypt.js
const openpgp = require("openpgp");
const fs = require("fs");

const privateKeyArmored = fs.readFileSync("./private.key");
const passphrase = `obiwan`;

(async () => {
  const privateKey = (await openpgp.key.readArmored([privateKeyArmored]))
    .keys[0];
  await privateKey.decrypt(passphrase);

  const encryptedData = fs.readFileSync("encrypted-secret.txt");
  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encryptedData),
    privateKeys: [privateKey],
  });
  console.log(`successfully decrypted data... 👇`);
  console.log(decrypted.data);
})();
