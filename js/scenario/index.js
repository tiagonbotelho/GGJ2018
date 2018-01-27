
function Scenario() {

}

Scenario.prototype.onConversation = function(conversation, channel) {
  console.log(conversation);
  console.log(channel)
  channel.addMessage(company.getRandomUser().name, "lolololol :P")
}
