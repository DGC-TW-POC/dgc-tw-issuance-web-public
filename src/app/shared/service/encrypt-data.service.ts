import * as CryptoJS from 'crypto-js';

export class EncryptDataService {
    private iv: CryptoJS.lib.WordArray;
    private key: CryptoJS.lib.WordArray;
    constructor(iv: string, key: string) {
        this.iv = CryptoJS.enc.Base64.parse(iv);
        this.key = CryptoJS.SHA256(key);
    }

    public encryptData(data: any) {
        let encryptedString;
        if (typeof data == "string") {
            data = data.slice();
            encryptedString = CryptoJS.AES.encrypt(data, this.key, {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        }
        else {
            encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), this.key, {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        }
        return encryptedString.toString();
    }

    public decryptData(encryptedData: any) {
        let decrypted = CryptoJS.AES.decrypt(encryptedData, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}