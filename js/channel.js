function Channel(id, name, hasNotifications, conversations, active, type) {
    this.type = type;
    this.id = type + id;
    this.classes = [type, this.id];
    this.name = name;
    this.hasNotifications = hasNotifications;
    this.conversations = conversations;
    this.active = active;
}

Channel.prototype.header_template = function() {
    var name = this.name;

    if (this.type === "channel") {
        name = "#" + this.name;
    }

    return `<div class="header"><span class="channel-name">${name}</span></div>`
}

Channel.prototype.profile_template = function() {
    return `<div class="profile"></div>`
}

Channel.prototype.template = function() {
    if (this.hasNotifications) {
        this.classes = this.classes.concat("has-notifications");
    }

    if (this.active) {
        this.classes = this.classes.concat("active");
    }

    return `<div class="${this.classes.join(" ")}"># <span>${this.name}</span></div>`;
}

Channel.prototype.addMessage = function(from, message) {
    var date = new Date();
    var conversation = new Conversation(from, date, message);
    this.conversations = this.conversations.concat(conversation);

    $(".content").prepend(conversation.template());
    $(".chatbox").html("");
}

Channel.prototype.renderConversation = function() {
    this.conversations.forEach(function(conversation) {
        $(".content").prepend(conversation.template());
    })
}

Channel.prototype.activate = function() {
    this.active = true;
    let handle = "#";

    if (this.type === "user") { handle = "@"; }
    if (this.hasNotifications) { $("." + this.id).removeClass("has-notifications"); }

    $("." + this.id).addClass("active");

    this.renderConversation();

    $(".chatbox").attr("placeholder", "Message " + handle + this.name);
    $(".user-header").append(this.header_template());

    var $this = this;

    $(".header").on('click', function() {
        $("#main").append($this.profile_template());
    });
}

Channel.prototype.deactivate = function() {
    this.active = false;

    $("." + this.id).removeClass("active");
    $(".content").empty();
    $(".user-header").empty();
}

Channel.findChannel = function(list, name) {
    var result = null;

    list.forEach(function(item) {
        if (item.name === name) {
            result = item;
        }
    });

    return result;
}

Channel.getUsers = function(list) {
    return list.filter(function(item) {
        return item.type === "user";
    })
}

Channel.getChannels = function(list) {
    return list.filter(function(item) {
        return item.type === "channel";
    })
}
