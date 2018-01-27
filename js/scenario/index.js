
function Scenario() {

}

Scenario.prototype.onConversation = function(conversation, channel) {
  console.log(conversation);
  console.log(channel)
}


Scenario.prototype.monologue = function(user, channel, messages, cb) {
  var scenario = this.scenario
  var i = 0

  function internal() {
    channel.addMessage(user, messages[i])
    i++

    if(i < messages.length) {
      setTimeout(function() { internal() }, typingLength(messages[i]))
    }
    else {
      cb(scenario)
    }
  }

  setTimeout(function() { internal() }, 1000)
}
