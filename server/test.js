const crypto = require("crypto");
const token = crypto.randomBytes(32).toString("hex");
const date1 = Date.now();
const date2 = Date.now() + 3600;
console.log(date1);
console.log(date2);

console.log(token);
