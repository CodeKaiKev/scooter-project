const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {
      Tokyo: [],
      Manhattan: [],
      London: [],
      InUse: []
    };
    this.registeredUsers = {};
  }

  //Should register our user
  registerUser(username, password, age) {
    //Checks if username is there or not
    
      if((!(this.registeredUsers.hasOwnProperty(username))) && (age >= 18)) {
        //We are registering a new user
        this.registeredUsers[username] = new User(username, password, age);
        console.log("user has been registered");
        return this.registeredUsers[username];
        //Error checking 
      } else if (age < 18) {
        throw new Error("too young to register.");
      } else {
        throw new Error("already registered");
      } 
 
  }

  //Log in app
  loginUser(username, password) {
    if((!(this.registeredUsers.hasOwnProperty(username))) || (password !== this.registeredUsers[username].password)) {
      throw new Error("Username or password is incorrect");
    } else {
      this.registeredUsers[username].login(password);
      //console.log(this.registeredUsers[username].loggedIn);
      console.log("user has been logged in");
    } 
  }

  //Log out of app
  logoutUser(username)  { 
    if(!(this.registeredUsers.hasOwnProperty(username))) {
      throw new Error("no such user is logged in");
    } else {
      this.registeredUsers[username].logout();
      console.log("user is logged out");
    }
  }

  //Creating a scooter
  createScooter(station) {
    try {
      const scooter = new Scooter(station);
      this.stations[station].push(scooter);
      console.log("created new scooter");
    } catch(err) {
      throw new Error("no such station")
    }
  }

  //docking scooter
  dockScooter(scooter, station) {
    if(!(this.stations.hasOwnProperty(station))) {
      throw new Error("no such station");
    } else if (scooter.station === station) {
      throw new Error("scooter already at station");
    } else {
      let checkSerialNumber = scooter.serial;
      this.stations[station].push(scooter);
      scooter.dock(station);
      for(let i in this.stations["InUse"]) {
        if (this.stations["InUse"][i].serial === checkSerialNumber) {
          this.stations["InUse"].pop(i);
        }
      }
      console.log("scooter is docked");
    }
  }

  //renting a scooter
  rentScooter(scooter, User) {
    if(scooter.station === null) {
      throw new Error("scooter already rented");
    } else {
      if(scooter.rent()) {
        let checkSerialNumber = scooter.serial;
        for(let i in this.stations[scooter.station]){
          if (this.stations[scooter.station][i].serial === checkSerialNumber) {
            this.stations[scooter.station].pop(i);
          }
        }
        scooter.user = User;
        scooter.station = null;
        this.stations["InUse"].push(scooter);
        console.log("CheckingABZ", scooter);
        console.log("scooter is rented");
      }
      //Removing scoooter from array of station
      //this.stations[scooter.station].splice(this.stations[scooter.station].indexOf(scooter),1);
      //scooter.user = user;
    }
  }
  
  //This is printing the registered users and the stations
  print() {
    console.log("Users", this.registeredUsers);
    console.log("Stations", this.stations);
  }
}

module.exports = ScooterApp
