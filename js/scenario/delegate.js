var current_junior_conversation = 0;
var current_senior_conversation = 0;
var help_found = false;

var DelegateScenario = function() {
    var senior = company.getDepartmentSeniorRandomUser(company.player.department);
    var junior = company.getDepartmentJuniorRandomUser(company.player.department);

    if(!senior) { senior = company.getRandomUser(); }

    if(!junior) { junior = company.getRandomUser(); }

    this.senior = senior;
    this.junior = junior;

    var senior_channel = Channel.findOrCreateUserChannel(senior.name, false);
    var junior_channel = Channel.findOrCreateUserChannel(junior.name, false)
    var $this = this;

    Channel.subscribe(senior_channel.name, this);
    Channel.subscribe(junior_channel.name, this);

    this.senior_messages = [
        new Outcome(`Hey ${company.player.name}, are you available to have a look at a few CVs?`, []),
        new Outcome(`Great please talk to him then. Have a great day!`, [
            new Negative(`Hm, ok. Can you then ask someone else to take a look?`, ["no", "i can't", "sorry", "unable", "sadly"]),
            new Negative(`Are you sure you are not too busy already? Maybe someone can take that work for you!`, ["yeah", "sure", "i am up for it", "please do", "yes", "of course", "ofc"])
        ]),
        new Outcome(`Ok! Let me know if you were able to find someone then!`, [new Negative(`Well.. do it!`, ["no", "don't" , "nah", "i don't think so", "sorry", "unable", "not"])], function() {
            Channel.subscribe(junior_channel.name, $this);

            setTimeout(function() {
                if (!help_found) {
                    senior_channel.addMessage(senior, "Hey! Are you still looking? I need those CVs reviewed by today!")
                }
            }, 10000)
        })
    ];

    this.junior_messages = [
        new Outcome(`Hi ${company.player.name}! Sure I am glad to help you out if possible`, [], function() {
            help_found = true;
        })
    ]

    senior_channel.addMessage(this.senior, this.senior_messages[0].message(new Conversation(this.senior, new Date, "")));
    function Negative(message, keywords) {
        this.message = message;
        this.keywords = keywords;
    }
}

DelegateScenario.prototype = new Scenario();
DelegateScenario.prototype.onConversation = function(conversation, channel) {
    if (conversation.from !== this.senior) {
        channel.addMessage(this.senior, this.senior_messages[current_senior_conversation].message(conversation))
    } else if (conversation.from !== this.junior) {
        channel.addMessage(this.junior, this.junior_messages[current_junior_conversation].message(conversation))
    }
}

function Outcome(positive, negatives, callback) {
    this.positive = positive;
    this.negatives = negatives;
    this.callback = callback;
}

Outcome.prototype.message = function(conversation) {
    var match = false;
    var result = this.positive;

    for (i = 0; i < this.negatives.length; i++) {
        let keywords = this.negatives[i].keywords;

        for (j=0; j < keywords.length; j++) {
            if(conversation.message.toLowerCase().indexOf(keywords[j]) !== -1) {
                result = this.negatives[i].message;
                match = true;
            }
        }
    }

    if (this.callback) { this.callback() }

    if (conversation.from === this.junior) { current_junior_conversation++; }
    if (conversation.from === this.senior) { current_senior_conversation++; }

    return result;
}


