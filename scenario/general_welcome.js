var current_senior_conversation = 0;
var help_found = false;

var GeneralWelcomeScenario = function() {
    var senior = company.getDepartmentSeniorRandomUser(company.player.department);
    var users = company.users;

    if(!senior) { senior = company.getRandomUser(); }

    this.senior = senior;
    this.users = users;

    var senior_channel = Channel.findOrCreateUserChannel(senior.name, false)

    this.senior_channel = senior_channel;
    this.general_channel = Channel.findChannel(channels, "general");

    Channel.subscribe(senior_channel.name, this);

    var $this = this;

    this.senior_messages = [
        new Answer(`${company.player.name}!! I see that you already made some friends but would you be able to also introduce yourself to #general?`,
            [], function() { current_senior_conversation++ }),
        new Answer(`Please just do it so that people get to know you!`, [
            new Message("Great! You are doing great! I'll see you around!", ["sure", "yes", "will", "thing", "I'll", "no problem"])
        ], function() {
            Channel.subscribe($this.general_channel.name, $this);

            setTimeout(function() {
                if (!help_found) {
                    senior_channel.addMessage(senior, "Just a friendly reminder to introduce yourself to #general!")
                }
            }, 60 * 1000);

            current_senior_conversation++;
        })
    ]

    this.general_messages = [
        new Answer(`Hey ${company.player.name}! Welcome to the team!!`, [
            new Message("Hey man welcome but please do not use `@channel` ever again!", ["@channel"])
        ]),
        new Answer(`Glad to have you on the team ${company.player.name}`, [
            new Message("Dude come on you should know by now that `@channel` should not be used...", ["@channel"])
        ])
    ]

    senior_channel.addMessage(this.senior, this.senior_messages[0].message(new Conversation(this.senior, new Date(), "")));
}

GeneralWelcomeScenario.prototype = new Scenario();

GeneralWelcomeScenario.prototype.onConversation = function(conversation, channel) {
    setTimeout(function(scenario) {
        if (channel === scenario.senior_channel) {
            if (conversation.from !== scenario.senior) {
                channel.addMessage(scenario.senior, scenario.senior_messages[current_senior_conversation].message(conversation))
            }
        } else if (channel === scenario.general_channel) {
            var users = scenario.users;
            var usernames = Object.keys(users);

            setInterval(function() {
                var selected_username = usernames[Math.floor(Math.random() * usernames.length)];
                var selected_user = users[selected_username];
                usernames = usernames.splice(usernames.indexOf(selected_username), 1);


                channel.addMessage(selected_user, scenario.general_messages[Math.floor(Math.random() * scenario.general_messages.length)].message(conversation));

                if (users.length() === 0) {
                    this.clearInterval();
                }
            }, 1000)
        }
    }(this), Math.round(Math.random() + 1));
}
