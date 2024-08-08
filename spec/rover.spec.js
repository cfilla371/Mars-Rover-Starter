const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function(){

  it('constructor sets position and default values for mode and generatorWatts', function(){
    let test = 100
    let rover = new Rover(test)
    expect(rover.position).toBe(test)
    expect(rover.mode).toBe('NORMAL')
    expect(rover.generatorWatts).toBe(110)
  })
   
  it('response returned by receiveMessage contains the name of the message', function(){
    let rover = new Rover(100)
    let commands = [new Command('test')]
    let message = new Message('test mesage', commands)
    expect(rover.receiveMessage(message).message).toBe(message.name)
  })

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let rover = new Rover(100)
    let commands = [new Command('STATUS_CHECK'), new Command('STATUS_CHECK')]
    let message = new Message('test message', commands)
    expect(rover.receiveMessage(message).results.length).toBe(commands.length)
  })

  it('responds correctly to the status check command', function(){
    let rover = new Rover(100)
    let commands = [new Command('STATUS_CHECK')]
    let message = new Message('test mesage', commands)
    expect(rover.receiveMessage(message).results[0].roverStatus.position).toBe(100)
    expect(rover.receiveMessage(message).results[0].roverStatus.mode).toBe('NORMAL')
    expect(rover.receiveMessage(message).results[0].roverStatus.generatorWatts).toBe(110)
  })

  it('responds correctly to the mode change command', function(){
    let rover = new Rover(100)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message('test mesage', commands)
    expect(rover.receiveMessage(message).results[0].completed).toBe(true)
  })

  it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let rover = new Rover(100)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 250)]
    let message = new Message('low power move test', commands)
    expect(rover.receiveMessage(message).results[1].completed).toBe(false)
  })

  it('responds with the position for the move command', function(){
    let rover = new Rover(100)
    let commands = [new Command('MOVE', 250)]
    let message = new Message('low power move test', commands)
    rover.receiveMessage(message)
    expect(rover.position).toBe(commands[0].value)
  })
});
