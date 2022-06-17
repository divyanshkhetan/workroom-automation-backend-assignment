const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    return null;
  }
}

async function comparePassword(password, hash) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    return null;
  }
}

module.exports = {
  encryptPassword,
  comparePassword,
};
