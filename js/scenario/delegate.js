var DelegateScenario = function() {
    var senior = company.getDepartmentSeniorRandomUser(company.player.department);
    var junior = company.getDepartmentJuniorRandomUser(company.player.department);

    if(!senior) {
        senior = company.getRandomUser();
    }

    if(!junior) {
        junior = company.getRandomUser();
    }

    this.senior = senior;
    this.junior = junior;

    var senior_channel = Channel.findOrCreateUserChannel(senior.name, false);
    var junior_channel = Channel.findOrCreateUserChannel(junior.name, false)

    Channel.subscribe(senior_channel.name, this);
    Channel.subscribe(junior_channel.name, this);

    this.senior_messages = [
        new Outcome(`Hey ${company.player.name}, are you available to have a look at a few CVs?`, []),
        new Outcome(`Great please talk to him then. Have a great day!`, [new Negative(`What do you mean you don't want to do it?`, ["no"]), new Negative(`Are you sure you are not too busy already? Maybe someone can take that work for you!`, ["yes", "i will"])])
    ];

    senior_channel.addMessage(this.senior, this.senior_messages[0].message());
    this.senior_messages.shift();
    function Negative(message, keywords) {
        this.message = message;
        this.keywords = keywords;
    }
}

DelegateScenario.prototype = new Scenario();
DelegateScenario.prototype.onConversation = function(conversation, channel) {
    if (conversation.from !== this.senior) {
        channel.addMessage(this.senior, this.senior_messages[0].message())
        this.senior_messages.shift();
    }
}

function Outcome(positive, negatives) {
    this.positive = positive;
    this.negatives = negatives;
}

Outcome.prototype.message = function() {
    var match = false;
    var result = this.positive;

    for (i = 0; i < this.negatives.length; i++) {
        let keywords = this.negatives[i].keywords;

        for (j=0; j < keywords.length; j++) {
            if(this.positive.indexOf(keywords[j]) !== -1) {
                result = this.negatives[i].message;
                match = true;
            }
        }
    }

    return result;
}


