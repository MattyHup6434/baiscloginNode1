const db = require('../config/db');
const bcrypt = require('bcrypt');

const userService = {

  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user_admin WHERE username = ?';
      db.query(query, [username], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); 
      });
    });
  },


  registerUser: async (username, password, roleCode, fullname, email, address) => {
    const hashedPassword = await bcrypt.hash(password, 10); // แฮชรหัสผ่าน
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO user_admin (username, password, role_code, fullname, email, address)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [username, hashedPassword, roleCode, fullname, email, address];
      db.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, username, fullname, email });
      });
    });
  },
};

module.exports = userService;
