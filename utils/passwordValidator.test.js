const {passwordValidator} = require('./passwordValidator');

test('passwordValidation', () => {
    const test1 = passwordValidator('qwerty');
    expect(test1.success).toBe(false);
    expect(test1.message).toBe('Password must be atleast 8 characters');

    const test2 = passwordValidator('QWERTYUIOP');
    expect(test2.success).toBe(false);
    expect(test2.message).toBe('Password must contain atleast one lowercase letter');

    const test3 = passwordValidator('qwertyuiop');
    expect(test3.success).toBe(false);
    expect(test3.message).toBe('Password must contain atleast one uppercase letter');

    const test4 = passwordValidator('Qwertyuiop');
    expect(test4.success).toBe(false);
    expect(test4.message).toBe('Password must contain atleast one number');

    const test5 = passwordValidator('Qwerty123');
    expect(test5.success).toBe(false);
    expect(test5.message).toBe('Password must contain atleast one special character');

    const test6 = passwordValidator('Qwerty@123');
    expect(test6.success).toBe(true);
    expect(test6.message).toBe('Password Validated!');
});