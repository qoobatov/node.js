const EventEmitter = require("events");

// const lemitter = new EventEmitter();

class Logger extends EventEmitter{

    logging = (msg) => {
      console.log(msg);
      this.emit("some_event", { id: 1, text: "Blha blha blha" });
    };
}


module.exports = Logger;
