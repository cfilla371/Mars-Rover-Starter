const Command = require('../command.js');

describe("Command class", function() {
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error("Command type required."));
  });

  it ('constructor sets command type' , function() {
    expect(new Command('test').commandType).toBe('test')
  })
  it ('constructor sets a value passed in as the 2nd argument' , function() {
    expect(new Command('test' ,'test2').value).toBe('test2')
  })
})