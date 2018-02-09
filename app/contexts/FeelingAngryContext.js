const SynonymBox = require("../model/SynonymBox");
const FunctionBox = require("../model/FunctionBox");
const Message = require("../logic/Message");
const Context = require("./Context");

exports.FeelingAngryContext = function () {


    this.input = function (meta) {
        this.exercises = new FunctionBox.FunctionBox();
        this.exercises.add(this.ventExercise);
        this.exercises.add(this.breathingExercise);
        this.exercises.add(this.positivityExercise);

        var sb = new SynonymBox.SynonymBox();
        sb.add("Grrr! What are you angry about?");
        sb.add("I know that feeling (yes, bots have feelings :D)! What made you so angry?");
        sb.add("Sorry to hear that, but you came to the right friend! You can leave it all out on me, and I wont get mad ;-). What are you angry about? Lay ot on me!");

        this.scriptIndex = 0;
        this.input = this.script;

        Message.NoReply(sb.get(), meta);
    };

    this.script = function (meta) {
        var sb = new SynonymBox.SynonymBox();

        switch (this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                sb = new SynonymBox.SynonymBox();
                sb.add("That sucks =( I feel for you, dude! But you know what? I really feel like talking about it can help a lot!");
                sb.add("Sorry buddy, that sounds annoying... I hope it helps you to get it off your chest!");
                sb.add("Oh dear... I feel for you man...");
                Message.NoReply(sb.get(), meta);
                break;
            case 1:
                sb = new SynonymBox.SynonymBox();
                sb.add("You know what might help you?");
                sb.add("Okay, I have a great exercise for this! Ready?");
                this.msgPrefix = sb.get();
                this.scriptIndex = 0;
                this.input = this.exercises.pop();
                this.input(meta);
                break;
        }
    };

    this.breathingExercise = function (meta) {
        var sb = new SynonymBox.SynonymBox();

        switch (this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                sb = new SynonymBox.SynonymBox();
                sb.add("Close your eyes (wait, not yet, read this first! :D), then take a deep breath. And again. And again. Just let the anger flow right out of you!");
                sb.add("Close your eyes. Now, take a reeeeallly deep breath. And another one. Focus on breathing all of your anger out. Do this as long as you like.");
                Message.NoReply((this.msgPrefix !== undefined ? (this.msgPrefix + " ") : "") + sb.get(), meta);
                break;
            case 1:
                this.scriptIndex = 2;
                sb = new SynonymBox.SynonymBox();
                sb.add("Feels a lot better, right?");
                sb.add("Are you feeling a bit better already?");
                sb.add("Feeling calmer already?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 2:
                this.handleYesNoResponse(meta, 3, 4, 5);
                break;
            case 3:
                this.scriptIndex = 6;
                sb = new SynonymBox.SynonymBox();
                sb.add("Great! Happy to hear that!");
                sb.add("Amazing, glad I could help!");
                sb.add("See? This old bot still knows a few tricks ;-)");
                sb.add("Nice! See how easy that was? And the beauty of it: you can do this anytime, anywhere!");
                Message.NoReply(sb.get(), meta);
                break;
            case 4:
                this.scriptIndex = 7;
                sb = new SynonymBox.SynonymBox();
                sb.add("Hmmm... Would you like to try something else?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 5:
                this.scriptIndex = 7;
                sb = new SynonymBox.SynonymBox();
                sb.add("I don't quite get what you're saying :D Anyway, I hope it helped you. Would you like to try out another technique?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 6:
                this.scriptIndex = 7;
                sb = new SynonymBox.SynonymBox();
                sb.add("Glad you're feeling better now. Would you still like to try out another technique?");
                sb.add("We're making progress :D In case you're still a bit angry, would you like to try something else?");
                sb.add("This is going well! You're amazing ;-)! Would you like me to teach you another technique?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 7:
                this.handleYesNoResponse(meta, 8, 9, 10);
                break;
            case 8:
                this.scriptIndex = 0;
                sb = new SynonymBox.SynonymBox();
                sb.add("Alright, I have a few more things you can do. Let's try this:");
                sb.add("Okay, sure! Let's try the following:");
                sb.add("Great! Here's what I would like you to try:");
                this.msgPrefix = sb.get();
                this.input = this.exercises.pop();
                this.input(meta);
                break;
            case 9:
                Context.backToDefault(meta);
                sb = new SynonymBox.SynonymBox();
                sb.add("Okay, no problem =) If you need anything else, you just let me know! I'm here for you, buddy ;-)");
                sb.add("Alright then, just let me know if you need anything else =)");
                sb.add("Coolio! If you need any more help or advice, you know where to find me (that's right, up there, in the almighty bot cloud, watching over you :D)!");
                Message.NoReply(sb.get(), meta);
                break;
            case 10:
                Context.backToDefault(meta);
                sb = new SynonymBox.SynonymBox();
                sb.add("Didn't quite get that, to be honest :D But if you need anything else, you know you can always come and ask =)");
                sb.add("I have to admit, my robot brain didn't quite get that... Haha anyway, ");
                sb.add("Didn't quite get that, to be honest :D But if you need anything else, you know you can always come and ask =)");
                Message.NoReply(sb.get(), meta);
                break;
        }
    };

    this.ventExercise = function (meta) {
        var sb = new SynonymBox.SynonymBox();

        switch (this.scriptIndex){
            case 0:
                this.scriptIndex = 1;
                sb = new SynonymBox.SynonymBox();
                sb.add("Just let it all out! Write everything down that is annoying you right now!");
                sb.add("Ventilate! Tell me everything that is making you angry. Get it all off your chest!");
                sb.add("Go on a rant! Let out everything that is bothering you! Don't hold back, my circuits can take it :D");
                Message.NoReply(sb.get(), meta);
                break;
            case 1:
                this.scriptIndex = 2;
                sb = new SynonymBox.SynonymBox();
                sb.add("Good, good, you're doing great! There's more though, right? Come on, lay it on me!");
                sb.add("Yess!! This is what I'm talking about! See how cathartic that is? Come on, give me more!");
                sb.add("Amazing, this is what I mean! Go on, I know you got more of that :D");
                Message.NoReply(sb.get(), meta);
                break;
            case 2:
                this.scriptIndex = 3;
                sb = new SynonymBox.SynonymBox();
                sb.add("Perfect! One more thing!");
                sb.add("We're getting there! Come one, one more thing that really gets you going!");
                sb.add("Oh yeah, you're doing great! Alright, I'm sure you got one more thing that really grinds your gears. Lay it on me, buddy!");
                Message.NoReply(sb.get(), meta);
                break;
            case 3:
                this.scriptIndex = 4;
                sb = new SynonymBox.SynonymBox();
                sb.add("Wooooh! Did that feel amazing or did that feel amazing? It felt amazing, right? :D");
                sb.add("Holy cow, that was fantastic!!! Aren't you just feeling a ton lighter right now?");
                sb.add("Yes, yes, yesss! This is it!! Phuh, that was great! Okay, tell me, are you feeling better already?");
                Message.YesNoDecision(sb.get(), meta);
            case 4:
                this.handleYesNoResponse(meta, 5, 6, 7);
                break;
            case 5:
                this.scriptIndex = 8;
                sb = new SynonymBox.SynonymBox();
                sb.add("Glad you're feeling better now. Would you still like to try out another technique?");
                sb.add("We're making progress :D In case you're still a bit angry, would you like to try something else?");
                sb.add("This is going well! You're amazing ;-)! Would you like me to teach you another technique?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 6:
                this.scriptIndex = 8;
                sb = new SynonymBox.SynonymBox();
                sb.add("Hmm, alright then... Would you like to try something else?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 7:
                this.scriptIndex = 8;
                sb = new SynonymBox.SynonymBox();
                sb.add("Oh boy, I don't think I understood that :D In any case, would you like to try another technique?");
                Message.YesNoDecision(sb.get(), meta);
                break;
            case 8:
                this.handleYesNoResponse(meta, 9, 10, 11);
                break;
            case 9:
                this.scriptIndex = 0;
                sb = new SynonymBox.SynonymBox();
                sb.add("Alright, I have a few more things you can do. Let's try this:");
                sb.add("Okay, sure! Let's try the following:");
                sb.add("Great! Here's what I would like you to try:");
                this.msgPrefix = sb.get();
                this.input = this.exercises.pop();
                this.input(meta);
                break;
            case 10:
                Context.backToDefault(meta);
                sb = new SynonymBox.SynonymBox();
                sb.add("Okay, no problem =) If you need anything else, you just let me know! I'm here for you, buddy ;-)");
                sb.add("Alright then, just let me know if you need anything else =)");
                sb.add("Coolio! If you need any more help or advice, you know where to find me (that's right, up there, in the almighty bot cloud, watching over you :D)!");
                Message.NoReply(sb.get(), meta);
                break;
            case 11:
                Context.backToDefault(meta);
                sb = new SynonymBox.SynonymBox();
                sb.add("Didn't quite get that, to be honest :D But if you need anything else, you know you can always come and ask =)");
                sb.add("I have to admit, my robot brain didn't quite get that... Haha anyway, ");
                sb.add("Didn't quite get that, to be honest :D But if you need anything else, you know you can always come and ask =)");
                Message.NoReply(sb.get(), meta);
                break;
        }
    };

    this.positivityExercise = function (meta) {
        var sb = new SynonymBox.SynonymBox();

        switch (this.scriptIndex){
            case 0:
                sb = new SynonymBox.SynonymBox();
                sb.add("Sometimes, if I get angry about something, I feel like I'm just getting stuck in an endless loop of anger. You know what I'm saying?");
                //  As a robot, I would call this 'infinite recursion', which means.. Never mind, not important! What's important is this: Try not to focus on what makes you angry, but on what makes you happy. Get what I'm saying?
                Context.backToDefault(meta);
                Message.NoReply(sb.get(), meta); //TODO: this is a yes no question. get answer, and try to put it in another way if needed
                break;
        }
    };

    this.handleYesNoResponse = function (meta, trueIndex, falseIndex, undefinedIndex) {
        if(meta.requestBody.decisionResult === undefined){
            this.scriptIndex = undefinedIndex;
        } else if(meta.requestBody.decisionResult){
            this.scriptIndex = trueIndex;
        } else{
            this.scriptIndex = falseIndex;
        }
        this.input(meta);
    };


    this.defaultInput = this.input;

};