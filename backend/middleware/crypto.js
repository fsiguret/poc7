const crypto = require('crypto');
const password = 'azertyuiopqsdfghjklmwxcvbnazerty';//change this for production.
const algorithm = 'aes-256-cbc';

function encrypt(string) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
    let encrypted = cipher.update(string);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(string) {
    let textParts = string.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');

    let encryptedString = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), iv);
    let decrypted = decipher.update(encryptedString);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();


}

module.exports = { encrypt, decrypt };
