function Channel(id, name, hasNotifications, conversations, active, type) {
    this.type = type;
    this.id = type + id;
    this.classes = [type, this.id];
    this.name = name;
    this.hasNotifications = hasNotifications;
    this.conversations = conversations;
    this.active = active;
}

Channel.prototype.template = function(index) {
    var classes = [this.type, this.type + index];

    if (this.hasNotifications) {
        classes = classes.concat("has-notifications");
    }

    if (this.active) {
        classes = classes.concat("active");
    }

    return `<div class="${classes.join(" ")}"># <span>${this.name}</span></div>`;
}

Channel.prototype.addMessage = function(from, message) {
    var date = new Date();
    var conversation = new Conversation(from, date, message);
    this.conversations = this.conversations.concat(conversation);

    $(".content").prepend(conversation.template());
    $(".chatbox").html("");
}

Channel.prototype.activate = function() {
    this.active = true;
    var handle = "#"

    if (this.type == "user") {
        handle = "@"
    }

    $(this.id).addClass("active");

    $(".chatbox").attr("placeholder", "Message " + handle + this.name);
}

Channel.prototype.deactivate = function() {
    this.active = false;

    $(this.id).removeClass("active");
}

Channel.findChannel = function(list, name) {
    var result = null;

    list.forEach(function(item) {
        if (item.name === name) {
            result = item;
        }

        return result;
    });
}

Channel.getUsers = function(list) {
    list.filter(function(item) {
        return item.type === "user";
    })
}

Channel.getChannels = function(list) {
    list.filter(function(item) {
        return item.type === "channel";
    })
}
