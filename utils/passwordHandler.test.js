const {encryptPassword, comparePassword} = require("./passwordHandler");

test("encryptPassword", async () => {
    const password = "password";
    const hash = await encryptPassword(password);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    }
);

test("comparePassword", async () => {
    const password = "password";
    const hash = await encryptPassword(password);
    const isValid = await comparePassword(password, hash);
    expect(isValid).toBe(true);
    }
);