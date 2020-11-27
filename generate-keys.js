const openpgp = require("openpgp");
const fs = require("fs");

generate();
async function generate() {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "luke", email: "luke@tatooine.com" }],
    curve: "ed25519",
    passphrase: "obiwan",
  });
  fs.writeFileSync("./private.key", privateKeyArmored);
  fs.writeFileSync("./public.key", publicKeyArmored);
  console.log(`keys generated and written to file...`);
}
