const User = require('../src/User')

//User tests here
//typeof user === object
describe('checking the user instance integrity', () => {
    const user = new User("001","abc", 21);
   //tesing the properities here
    test('checking right properites in the user constructor', () => {
      // Checking the properities in the user class
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("age");
      expect(typeof user.loggedIn).toBe("boolean");
    })
    //username should be set
    test('checking that the username is correct', () => {
        expect(user.username).toEqual("001");
    })
    //should be set the password
    test('checking that the password is correct', () => {
        expect(user.password).toEqual("abc");
    })
    //age should be set
    test('checking that the age is correct', () => {
        expect(user.age).toEqual(21);
    })
    //The loggedin should be false at start
    test('checking that loggedIn is false at first', () => {
        expect(user.loggedIn).toEqual(false);
    })

  })

//Testing login method
describe('Testing the login method', () => {
    const user = new User("002", "abc123", 18);
    //Testing the wrong password
    test('Checking the login method for false method', () => {
        expect(() => {
            user.login("abc").toThrow("incorrect password");
        }) 
    })
    //testing correct password
    test('Checking the login method for right password', () => {
        user.login("abc123");
        expect(user.loggedIn).toBe(true);
    })
})

//Testing the logout method loggedIn should be false
describe('Testing the logout method', () => {
    const user = new User("003", "abczxy", 22);
    //Should log out the user
    test('Checking the logout method', () => {
        user.logout();
        expect(user.loggedIn).toBe(false);
    });
})


