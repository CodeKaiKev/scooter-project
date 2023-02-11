


class Scooter{
  // scooter code here
  static nextSerial = 1;
  constructor(station) {
    //station is only parameter
    this.station = station;
    //All scooters are docked, charged and in good repair
    this.charge = 100;
    this.isBroken = false;
    this.user = null;
    //Figuring it out
    
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
  }


  rent() {
    if((this.charge > 20) && !(this.isBroken)) {
      //remove from station and check out to user
      //this.station = null;
      return true;
      //Not too sure about checking out user.
      //this.user = user;
    } else if (this.charge > 20) {
      throw new Error("scooter needs repair")
    } else {
      throw new Error("scooter needs to charge")
    }
  }

  dock(station) {
    //Returning scooter to station and clearing out the user
    this.station = station;
    this.user = null;
  }

  async recharge() {

    console.log("Starting charging...");
    //Starts charging is less than 100%
    while(this.charge < 100) {
      await new Promise(resolve => setTimeout(resolve, 20));
      this.charge++;
      //Outputs charge every 5% increment
      if(this.charge % 5 === 0) { 
        console.log("Charge at: " + this.charge + "%")
      }
    }
    console.log("Finished charging")

  }

  async requestRepair() {
    //Waits 2 seconds before updating isBroken to false and logs
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.isBroken = false;
    console.log("repair completed");
  }
}


module.exports = Scooter
