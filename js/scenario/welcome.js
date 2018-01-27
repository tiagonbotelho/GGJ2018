
var i = 0

var WelcomeScenario = function () {
  var manager = company.getDepartmentSeniorRandomUser(company.player.department)

  if(!manager) {
    manager = company.getRandomUser()
  }

  this.manager = manager;

  var channel = Channel.findOrCreateUserChannel(manager.name, true)

  Channel.subscribe(channel.name, this)

  var messages = [
    `Hey ${company.player.name}, welcome to Transmissions Inc.`
  ]

  channel.addMessage(manager, messages[i])

}

WelcomeScenario.prototype = new Scenario()

WelcomeScenario.prototype.onConversation = function(conversation, channel) {
  if (conversation.from !== this.manager) {
    channel.addMessage(this.manager, "OH HAI!")
  }
}


