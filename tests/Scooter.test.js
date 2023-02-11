const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('checking the scooter instance integrity', () => {
  const scooter = new Scooter("London");
  const scooter2 = new Scooter("Tokyo");
  test('checking right properites in the constructor', () => {
    // edit this to be a real test!
    expect(scooter).toHaveProperty("user",null);
    expect(scooter.station).toBe("London");
    expect(scooter).toHaveProperty("serial");
    expect(scooter).toHaveProperty("charge");
    expect(typeof scooter.isBroken).toBe("boolean");
  }
)

  test("check if static value increments", () => {
    expect(scooter2.serial).toBe(scooter.serial + 1);
  })
})

//Method tests
describe('checking the rent scooter methods', () => {
  //tests here!
  const scooter3 = new Scooter("London");
  //Able to rent the scooter
  test("checking the rent returns true", () => {
    scooter3.charge = 90;
    scooter3.isBroken = false;
    expect(scooter3.rent()).toBe(true);
  })
  //Charge checking
  test("checking not enough charge", () => {
    scooter3.charge = 10;
    scooter3.isBroken = false;
    expect(() => {
      scooter3.rent();
    }).toThrow("scooter needs to charge");
  })
  //Repair checking
  test("checking needs repair", () => {
    scooter3.charge = 60;
    scooter3.isBroken = true;
    expect(() => {
      scooter3.rent();
    }).toThrow("scooter needs repair");
  })

})

//Dock method
describe("checking the dock method", () => {
  const scooter = new Scooter("Tokyo");
  //Testing the scooter docked at new station
  test("expect station to change", () => {
    scooter.dock("London");
    expect(scooter.station).toBe("London");
   
  })
  //Testing the scooter user is null
  test("expect user to be null when docked", () => {
    scooter.dock("Manhattan");
    
    expect(scooter.user).toBe(null);
  })
});
//requestRepair method
describe("Testing the repair method", () => {
  jest.setTimeout(9000);
  test("repair", async () => {
    const scooter = new Scooter("Tokyo");
    scooter.isBroken = true;
    
    await scooter.requestRepair(); // we need to wait for the repair!
    expect(scooter.isBroken).toBe(false);
  }); }
);
//recharge method
describe("Testing the charge method", () => {
  test("recharge", async () => {
    const scooter = new Scooter("London");
    scooter.charge = 60;
    await scooter.recharge(); // we need to wait for the charge!
    expect(scooter.charge).toBe(100);
  }); }
);
