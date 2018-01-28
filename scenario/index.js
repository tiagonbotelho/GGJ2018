
function Scenario() {
}

Scenario.prototype.onConversation = function(conversation, channel) {
  console.log(conversation);
  console.log(channel)
}


Scenario.prototype.typingLength = function(message) {
  return 1000 + (Math.random() * 1000 * 2) + (message.length * 100 / 60000)
}


Scenario.prototype.monologue = function(user, channel, messages, cb) {
  var scenario = this.scenario
  var i = 0

  function internal() {
    channel.addMessage(user, messages[i])
    i++

    if(i < messages.length) {
      setTimeout(function() { internal() }, scenario.typingLength(messages[i]))
    }
    else {
      cb(scenario)
    }
  }

  setTimeout(function() { internal() }, 1000)
}
