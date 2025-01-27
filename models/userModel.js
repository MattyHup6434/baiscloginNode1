const db = require('../config/db'); 

const User = {

  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM user_admin WHERE username = ?';
    db.execute(query, [username], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },


  createUser: (username, password, role_code, fullname, email, address, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      const query = 'INSERT INTO user_admin (username, password, role_code, fullname, email, address) VALUES (?, ?, ?, ?, ?, ?)';
      db.execute(query, [username, hashedPassword, role_code, fullname, email, address], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      });
    });
  }
};

module.exports = User;
