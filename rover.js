const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let reportObject = {
         message: message.name,
         commands: message.commands,
         results: []
      }

      for(let i = 0; i < reportObject.commands.length; i++) {
         if(reportObject.commands[i].commandType === 'STATUS_CHECK') {
            let statusCheck = {
               position: this.position,
               mode : this.mode,
               generatorWatts: this.generatorWatts
            }
            let statusResults = {
               completed: true,
               roverStatus: statusCheck
            }
            reportObject.results.push(statusResults)
         }
         if(reportObject.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = reportObject.commands[i].value
            let modeResults = {
               completed: true,
               mode: this.mode
            }
            reportObject.results.push(modeResults)
         }
         if(reportObject.commands[i].commandType === 'MOVE') {
            if(this.mode === 'NORMAL') {
               this.position = reportObject.commands[i].value
               let moveResult = {
                  completed: true,
                  position: this.position
               }
               reportObject.results.push(moveResult)
            }
            if(this.mode === 'LOW_POWER'){
               let moveResult = {
                  completed: false
               }
               reportObject.results.push(moveResult)
            }
         }
      }
      return reportObject
   }
}

module.exports = Rover;

