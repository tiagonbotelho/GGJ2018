
var i = 0

var WelcomeScenario = function () {
  var manager = company.getDepartmentSeniorRandomUser(company.player.department)

  if(!manager) {
    manager = company.getRandomUser()
  }

  var channel = Channel.findOrCreateUserChannel(manager.name, true)
  console.log(channel)

  var messages = [
    `Hey ${company.player.name}, welcome to Transmissions Inc.`
  ]

  channel.addMessage(manager, messages[i])

}

WelcomeScenario.prototype = new Scenario()

