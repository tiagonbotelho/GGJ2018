
function Scenario() {


}

Scenario.prototype.onConversation = function(conversation, channel) {
  console.log(conversation);
  channel.addMessage(from, "hi")
}
