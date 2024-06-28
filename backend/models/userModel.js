//Defines the schema for user data.

class User {
    constructor(id, email, password, username) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.username = username;
    }
  }
  
  module.exports = User