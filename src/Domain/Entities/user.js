class User {
  constructor({ firstName, email,password,isActivated,role }) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
    this.isActivated = isActivated;
    this.role = role;
  }
}

module.exports = User;
