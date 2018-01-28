function Answer(fallback_message, messages, callback) {
    this.fallback_message = fallback_message;
    this.messages = messages;
    this.callback = callback;
}

Answer.prototype.message = function(conversation) {
    var result = this.fallback_message;

    for (var i = 0; i < this.messages.length; i++) {
        if (Message.matchPhrase(conversation.message, this.messages[i].keywords)) {
            result = this.messages[i].message;
        }
    }

    if (this.callback) { this.callback() }

    return result;
}
