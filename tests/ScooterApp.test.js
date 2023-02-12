const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp');


// ScooterApp tests here
const scooterApp = new ScooterApp();
describe('Testing the scooter app', () => {
    test('checking the properties of the scooter app', () => {
        expect(scooterApp).toHaveProperty('stations');
        expect(typeof scooterApp.stations).toBe('object');
        expect(scooterApp.stations).toHaveProperty('Manhattan');
        expect(scooterApp.stations).toHaveProperty('London');
        expect(scooterApp.stations).toHaveProperty('Tokyo');
        expect(scooterApp.stations.Manhattan[0]).toBe(undefined);
        expect(scooterApp).toHaveProperty('registeredUsers');
        expect(typeof scooterApp.stations).toBe('object');
    })

    test('Testing the registered users', () => {
        expect(scooterApp).toHaveProperty('registeredUsers');
        expect(typeof scooterApp.registeredUsers).toBe('object');
    })

})

// registering the users
describe('Registering the user into the system testing', () => {
     
    //Test adding a user to the system
    test('Adding a user to the registered users', () => {
        const logSpy = jest.spyOn(console, 'log');
        
        scooterApp.registerUser("John005", "Xycj13£@", 30);
        expect(logSpy).toHaveBeenCalledWith(`user John005 has been registered`);
       
        //Checking by userName is registered
        expect(scooterApp.registeredUsers).toHaveProperty("John005");

        scooterApp.registerUser("Marx011", "H&9£IjdE", 45);
        expect(scooterApp.registeredUsers).toHaveProperty("Marx011");

    })

    //User age is less than 18
    test('User is too young', () => {
        expect(() => {
            scooterApp.registerUser("Bill006", "aS2^%2bc", 17)
        }).toThrow("too young to register.")
    })

    //We add a user first, then add same user
    test('Checking if the user has already been registered', () => {
      
        scooterApp.registerUser("Bond007", "1234", 22);
        expect(() => {
                scooterApp.registerUser("Bond007", "1234", 22)
        }).toThrow("Bond007 already registered");
    })
})


// logging in
    describe('Testing the login method, logging in', () => {
        test('checking if the username or password is incorrect ', () => {
            //Entering correct username wrong password
            expect(() => {
                scooterApp.loginUser("John005", "Xycj13£@123");
            }).toThrow("Username or password is incorrect");
            //Entering incorrect username.
            expect(() => {
                scooterApp.loginUser("John005DF", "Xycj13£@");
            }).toThrow("Username or password is incorrect");
        })

        test('checking if we can login the user', () => {
            
            const logSpy2 = jest.spyOn(console, 'log');
            
            scooterApp.loginUser("John005", "Xycj13£@");
            expect(logSpy2).toHaveBeenCalledWith("user John005 has been logged in");
            expect(scooterApp.registeredUsers["John005"].loggedIn).toBe(true);
            //console.log(scooterApp.registeredUsers["John005"].loggedIn);
        })
    })


    // logging out
    describe('Testing whether the logout function is called', () => {
        //Not found user
        test('checking if we cannot find the user', () => {
            expect(() => {scooterApp.logoutUser("Jahn005")}).toThrow("no such user is logged in");
        })
        test('testing whether we can an catch error logging out a user not logged in', () => {
            console.log(scooterApp.registeredUsers["Bond007"].loggedIn);
            expect(() => {scooterApp.logoutUser("Bond007")}).toThrow("no such user is logged in");
        })

        //Successfully logged out
        test('testing succesfully if we can logout', () => {
            const logSpy = jest.spyOn(console, 'log');
            scooterApp.logoutUser("John005")
            expect(scooterApp.registeredUsers["John005"].loggedIn).toBe(false);
            expect(logSpy).toHaveBeenCalledWith("user John005 is logged out");

            
            scooterApp.loginUser("Marx011", "H&9£IjdE");
            
        });

      
    });
    
// Create scooter
describe('Creating scooters', () => {
    test('creating the scooter for station', () => {
        //Checking right serial numbers as they are created
        const logSpy = jest.spyOn(console, 'log');
        scooterApp.createScooter("London");
        expect(scooterApp.stations["London"][0].serial).toBe(1);
        scooterApp.createScooter("London");
        expect(scooterApp.stations["London"][1].serial).toBe(2);
        scooterApp.createScooter("Tokyo");
        expect(scooterApp.stations["Tokyo"][0].serial).toBe(3);
        expect(logSpy).toHaveBeenCalledWith(`created new scooter #${scooterApp.stations["Tokyo"][0].serial}`);
        //Checking length of arrays
        expect(scooterApp.stations["London"].length).toBe(2);
        expect(scooterApp.stations["Tokyo"].length).toBe(1);

        expect(scooterApp.stations["Manhattan"].length).toBe(0);

        scooterApp.createScooter("Manhattan");
        scooterApp.createScooter("Manhattan");
        scooterApp.createScooter("Manhattan");
        
        expect(scooterApp.stations["Manhattan"].length).toBe(3);
    })

    test('checking for wrong stations not in the array', () => {
        expect(() => {
            scooterApp.createScooter("Paris");
        }).toThrow("no such station");
        expect(() => {
            scooterApp.createScooter("Landon");
        }).toThrow("no such station");

    })
})

// rent scooter method
describe("Testing whether the scooter is already rented", () => {
    test("Testing alrady rented", () => {
        console.log(scooterApp.stations["Manhattan"][1]);
        scooterApp.rentScooter(scooterApp.stations["Manhattan"][1], scooterApp.registeredUsers["Bond007"]);
        
        //scooterApp.print();
        expect(() => {
            scooterApp.rentScooter(scooterApp.stations["InUse"][0], scooterApp.registeredUsers["John005"]);
         }).toThrow(`scooter #${scooterApp.stations["InUse"][0].serial} already rented`);
    })

    test("Testing able to rent scooter", () => {
        //console.log(scooterApp.stations["Manhattan"][1]);
        let checkSerial = scooterApp.stations["London"][1].serial;
        scooterApp.rentScooter(scooterApp.stations["London"][1], scooterApp.registeredUsers["Marx011"]);
        let endArray = scooterApp.stations["InUse"].length -1;
        expect(scooterApp.stations["InUse"][endArray].serial).toBe(checkSerial);
        expect(scooterApp.stations["InUse"][endArray].user.username).toBe("Marx011");
        expect(scooterApp.stations["InUse"][endArray].station).toBe(null);
        //scooterApp.print();
       
    })
})

//Testing dock method for scooter app

describe("Scooter app testing dock method", () => {
    test("Invalid station should throw no such station", () => {
        expect(() => {scooterApp.dockScooter(scooterApp.stations["InUse"][0], "Berlin");}).toThrow("no such station");
    })
    test("Testing if scooter already at station", () => {
        expect(() => {scooterApp.dockScooter(scooterApp.stations["London"][0], "London");}).toThrow(`scooter #${scooterApp.stations["London"][0].serial} already at station London`);
    })
    test("Checking whether we can dock a scooter at the station", () => {
        const logSpy = jest.spyOn(console, 'log');
        
        
        
        let checkSerial = scooterApp.stations["InUse"][0].serial;
        scooterApp.dockScooter(scooterApp.stations["InUse"][0], "Tokyo");
        let endArray = scooterApp.stations["Tokyo"].length -1;
        expect(scooterApp.stations["Tokyo"][endArray].serial).toEqual(checkSerial);
        expect(logSpy).toHaveBeenCalledWith(`scooter #${scooterApp.stations["Tokyo"][endArray].serial} is docked`);
    })
})

describe('Printing views', () => {
    test('printing views', () => {
        scooterApp.print();
    })
})