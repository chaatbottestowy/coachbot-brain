const SynonymBox = require("../model/SynonymBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.GreetingContext = function () {

    this.greetings = new SynonymBox.SynonymBox();
    this.greetings.add("Oh, hey there!");
    this.greetings.add("Oh, hi, nice to see you!");
    this.greetings.add("Hey! Great to see you!");
    this.greetings.add("Hello! Nice to hear from you =)");


    this.input = function (meta) {
        new Message.NoReply(this.greetings.get(), meta);
        Context.backToDefault(meta);
    }

};