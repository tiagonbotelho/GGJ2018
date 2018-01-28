function Answer(fallback_message, messages, callback) {
    this.fallback_message = fallback_message;
    this.messages = messages;
    this.callback = callback;
}

Answer.prototype.message = function(conversation) {
    var result = this.fallback_message;

    for (i = 0; i < this.messages.length; i++) {
        console.log(this);
        console.log(this.messages[i]);
        if (Message.matchPhrase(conversation.message, this.messages[i].keywords)) {
            console.log(this);
            console.log(this.messages[i]);
            result = "yabadabadoo";
        }
    }

    if (this.callback) { this.callback() }

    return result;
}
