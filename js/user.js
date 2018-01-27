function User(name, hasNotifications, conversations, active) {
    this.classes = ["user"];
    this.name = name;
    this.hasNotifications = hasNotifications;
    this.conversations = conversations;
    this.active = active;
}

User.prototype.template = function() {
    if (this.hasNotifications) {
        this.classes = this.classes.concat("has-notifications");
    }

    if (this.active) {
        this.classes = this.classes.concat("active");
    }

    return `<div class="${this.classes.join(" ")}"># <span>${this.name}</span></div>`;
}

User.prototype.addMessage = function(from, message) {
    var date = new Date();
    console.log(from);
    var conversation = new Conversation(from, date, message);
    this.conversations = this.conversations.concat(conversation);
    console.log(this.conversations);

    $(".content").prepend(conversation.template());
    $(".chatbox").html("");
}

User.prototype.activate = function() {
    this.active = true;
    $(".chatbox").attr("placeholder", "Message @" + this.name);

    this.conversations.forEach(function(conversation) {
        $(".content").prepend(conversation.template());
    });
}

User.prototype.deactivate = function() {
    this.active = false;
    this.classes.pop();

    $(".content").empty();
}

User.findUser = function(users, username) {
    var result = null;

    users.forEach(function(user) {
        if (user.name == username) {
            result = user;
        }
    });

    return result;
}

