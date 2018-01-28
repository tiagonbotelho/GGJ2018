
var WelcomeScenario = function () {
  this.scenario = this

  this.generalChannel = Channel.subscribe('general', this)

  this.managerUser = company.getDepartmentSeniorRandomUser(company.player.department)
  if(!this.managerUser) { this.managerUser = company.getRandomUser() }
  this.mangerChannel = Channel.subscribe(this.managerUser.name, this)
  this.mangerChannel.activate()

  this.introduceUser = company.getDepartmentJuniorRandomUser(company.player.department)
  if(!this.introduceUser) { this.introduceUser = company.getRandomUser() }

  this.directSequence()
}

WelcomeScenario.prototype = new Scenario()

WelcomeScenario.prototype.onConversation = function(conversation, channel) {
  var c = conversation.message

  if (channel == this.generalChannel) {
    if(conversation.from == company.player) {
      var hi = c.search(/hi/i) > -1 || c.search(/hey/i) > -1  || c.search(/hello/i) > -1

      if(hi && c.search(/@all/i) > -1 ) {
        channel.addMessage(this.managerUser, 'Yes, we are really exited')
      }
    }
  }
  else if (channel == this.mangerChannel) {

  }
  else if(channel == this.introduceChannel && conversation.from != this.introduceUser) {
    if(c.search(/hi/i) > -1 || c.search(/hey/i) > -1  || c.search(/hello/i) > -1 ) {
      channel.addMessage(this.introduceUser, 'Hey! Welcome :)')
    }
  }
}

WelcomeScenario.prototype.directSequence = function() {
  var messages = [
    `Hey ${company.player.name}, welcome to Transmissions Inc.`,
    // 'I will be your manager',
    // 'here at Transmissions, we are a fast paced dynamic company',
    // 'we move at the speed of ideas',
    // 'follow my instructions and you will go far my padiwan',
    // 'SUCCESS is yours if you want it',
    // "but be warned...",
    // "if you can't cut it this job going to eat you up and spit you out",
    // `well on to the serious stuff`,
    `introduce your self directly to ${this.introduceUser.name} who will show you the ropes`,
    // 'and stop by #general and introduce yourself to @all',
    // "and have fun :)",
    // "we are all just one big family at Transmissions, think of me as your cool crazy friend"
  ]

  this.monologue(this.managerUser, this.mangerChannel, messages, function(scenario) {
    scenario.introduceChannel = Channel.subscribe(scenario.introduceUser.name, scenario)
  })
}

WelcomeScenario.prototype.generalSequence = function() {

}
