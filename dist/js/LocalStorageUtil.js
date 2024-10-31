export class LocalStorageUtil {
  static #encryptionKey = null;

  static async #ensureEncryptionKey() {
    if (!this.#encryptionKey) {
      const storedKey = localStorage.getItem('encryptionKey');
      if (storedKey) {
        this.#encryptionKey = await this.#importCryptoKey(JSON.parse(storedKey));
      } else {
        this.#encryptionKey = await this.#generateKey();
        localStorage.setItem('encryptionKey', JSON.stringify(await this.#exportCryptoKey(this.#encryptionKey)));
      }
    }
  }

  static async #generateKey() {
    return await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  static async #encryptData(data) {
    await this.#ensureEncryptionKey();
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      this.#encryptionKey,
      encodedData
    );
    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encryptedData))
    };
  }

  static async #decryptData(encryptedData) {
    await this.#ensureEncryptionKey();
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(encryptedData.iv) },
      this.#encryptionKey,
      new Uint8Array(encryptedData.data)
    );
    return JSON.parse(new TextDecoder().decode(decryptedData));
  }

  static async #exportCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return Array.from(new Uint8Array(exported));
  }

  static async #importCryptoKey(keyData) {
    return await window.crypto.subtle.importKey(
      "raw",
      new Uint8Array(keyData),
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  static async get(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    return await this.#decryptData(parsedItem);
  }

  static async set(key, value) {
    const encrypted = await this.#encryptData(value);
    localStorage.setItem(key, JSON.stringify(encrypted));
  }

  static async authenticatedUser(user) {
    await this.set('currentUser', user);
  }

  static async getCurrentUser() {
    const user = await this.get('currentUser');
    return user
  }

  static async isUserAuthenticated() {
    return await this.getCurrentUser() !== null;
  }


  static async logout() {
    await this.remove('currentUser');
  }
  static async getUserByEmail(email) {
    const users = await this.getUsers();
    return users.find(user => user.email === email);
  }


  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
    this.#encryptionKey = null; // Reset the encryption key
  }

  static keys() {
    return Object.keys(localStorage).filter(key => key !== 'encryptionKey');
  }

  static has(key) {
    return localStorage.getItem(key) !== null;
  }

  static size() {
    return this.keys().length;
  }

  static async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static async addUser(email, password, name, phone, address, score) {
    const users = await this.getUsers();
    if (users.some(user => user.name === name)) {
      throw new Error('User already exists');
    }
    const hashedPassword = await this.hashPassword(password);
    users.push({ email, password: hashedPassword, name, phone, address, score });
    await this.set('users', users);
  }

  static async getUsers() {
    return await this.get('users') || [];
  }

  static async authenticateUser(email, password) {


    const users = await this.getUsers();
    const user = users.find(user => user.email === email);

    if (!user) return false;

    const hashedPassword = await this.hashPassword(password);
    await this.authenticatedUser(user);
    return user.password === hashedPassword;
  }

  static async removeUser(email) {
    const users = (await this.getUsers()).filter(user => user.email !== email);
    await this.set('users', users);
  }

  static async updateUserPassword(email, newPassword) {
    const users = await this.getUsers();
    const user = users.find(user => user.email === email);
    if (user) {
      user.password = await this.hashPassword(newPassword);
      await this.set('users', users);
    } else {
      throw new Error('User not found');
    }
  }

  static getRemainingSpace() {
    let totalSpace;
    let usedSpace = 0;

    try {
      totalSpace = localStorage.getItem('__test__');
      let i = 0;
      while (true) {
        localStorage.setItem('__test__', 'x'.repeat(1024 * 1024)); // 1MB
        i++;
      }
    } catch (e) {
      totalSpace = i;
    } finally {
      localStorage.removeItem('__test__');
    }

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        usedSpace += localStorage[key].length;
      }
    }

    return {
      total: totalSpace * 1024 * 1024, // Convert to bytes
      used: usedSpace * 2, // Multiply by 2 for UTF-16 encoding
      remaining: (totalSpace * 1024 * 1024) - (usedSpace * 2)
    };
  }
}
