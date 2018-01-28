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

    this.senior_channel = senior_channel;
    this.junior_channel = junior_channel;

    Channel.subscribe(senior_channel.name, this);

    var $this = this;

    this.senior_messages = [
        new Answer(`Hey ${company.player.name}, are you available to have a look at a few CVs?`, [], function() { current_senior_conversation++ }),
        new Answer(`Great please talk to him then. Have a great day!`, [
            new Message(`Hm, ok. Can you then ask someone else to take a look?`, ["no", "i can't", "sorry", "unable", "sadly"]),
            new Message(`Are you sure you are not too busy already? Maybe someone can take that work for you!`, ["yeah", "sure", "i am up for it", "please do", "yes", "of course", "ofc"])
            ], function() { current_senior_conversation++ }),
        new Answer(`Ok! Let me know if you were able to find someone then!`, [new Message(`Well.. do it!`, ["no", "don't" , "nah", "i don't think so", "sorry", "unable", "not"])], function() {
            Channel.subscribe(junior_channel.name, $this);

            setTimeout(function() {
                if (!help_found) {
                    senior_channel.addMessage(senior, "Hey! Are you still looking? I need those CVs reviewed by today!")
                }
            }, 60 * 1000);

            current_senior_conversation++;
        })
    ];

    this.junior_messages = [
        new Answer("I am not sure what you are asking me, what exactly do you want me to do?", [new Message(`Hi ${company.player.name}! Sure I am glad to help you out if possible`, ["CV", "task", "help", "can", "you", "please"])], function() {
            help_found = true;

            current_junior_conversation++;
        })
    ]

    senior_channel.addMessage(this.senior, this.senior_messages[0].message(new Conversation(this.senior, new Date, "")));
}

DelegateScenario.prototype = new Scenario();

DelegateScenario.prototype.onConversation = function(conversation, channel) {
    setTimeout(function(scenario) {
        if (channel === scenario.senior_channel) {
            if (conversation.from !== scenario.senior) {
                channel.addMessage(scenario.senior, scenario.senior_messages[current_senior_conversation].message(conversation))
            }
        } else if (channel === scenario.junior_channel) {
            if (conversation.from !== scenario.junior) {
                channel.addMessage(scenario.junior, scenario.junior_messages[current_junior_conversation].message(conversation))
            }
        }
    }(this), Math.round(Math.random() + 1));
}

