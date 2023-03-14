class User {
  constructor({ firstName,lastName, email,password,isBlocked,role }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isBlocked = isBlocked;
    this.role = role;
  }
}

module.exports = User;
