

class User {
  // User code here
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    //When user created they are not logged in
    this.loggedIn = false;
  }

  login(password) {
    if(this.password === password) {
      //log in user
      this.loggedIn = true;
    } else {
      throw new Error("incorrect password")
    }
  }

  logout() {
    //log out user
    this.loggedIn = false;
  }
}

module.exports = User
