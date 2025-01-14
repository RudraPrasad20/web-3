const crypto = require("crypto");

const input = "random";
// digest -> Base64 / hex
const hash = crypto.createHash("sha256").update(input).digest("Base64");
console.log(hash);


// Give me an input string that outputs a SHA-256 hash that starts with 00000 . How will you do it?
function findhash( prefix ) {
  let input = 0;
  while (true) {
    const inputString = input.toString();
    const hash = crypto.createHash("sha256").update(inputString).digest("hex");
    if (hash.startsWith(prefix)) {
      return { input: inputString, hash: hash };
    }
    input++
  }
}
const result = findhash("00");
console.log(result.hash);
console.log(result.input);

// nonce - a number