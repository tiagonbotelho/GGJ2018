function Message(message, keywords) {
    this.message = message;

    if (keywords) {
        this.keywords = keywords;
    } else {
        this.keywords = [];
    }
}

Message.matchPhrase = function(phrase, keywords) {
    var match = false;

    for(var i = 0; i < keywords.length; i++) {
        if (phrase.toLowerCase().indexOf(keywords[i]) !== -1) {
            match = true;
        }
    }

    return match;
};

