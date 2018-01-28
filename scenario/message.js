function Message(message, keywords) {
    this.message = message;

    if (keywords) {
        this.keywords = keywords;
    } else {
        this.keywords = [];
    }
}

Message.match = function(phrase, keywords) {
    var match = false;

    for(i = 0; i < keywords.length; i++) {
        if (phrase.toLowerCase().indexOf(keywords[i]) !== -1) {
            match = true;
        }
    }

    return match;
};

