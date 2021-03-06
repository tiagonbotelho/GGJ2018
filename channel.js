function Channel(name, hasNotifications, conversations, active, type) {
    this.type = type;
    this.id = type + (channels.length + 1);
    this.classes = [type, this.id];
    this.name = name.toLowerCase();
    this.hasNotifications = hasNotifications;
    this.conversations = conversations;
    this.active = active;
    this.followers = [];
}

Channel.prototype.profile_template = function() {
    return `<div class="profile-info"><span class="profile-name">${this.name}</span></div>`
}

Channel.prototype.header_template = function() {
    var name = this.name;

    if (this.type === "channel") {
        name = "#" + this.name;
    }

    return `<div class="header"><span class="channel-name">${name}</span></div>`
}

Channel.prototype.template = function() {
    if (this.hasNotifications) {
        this.classes.push("has-notifications");
    }

    if (this.active) {
        this.classes.push("active");
    }

    return `<div class="${this.classes.join(" ")}"># <span>${this.name}</span></div>`;
}

Channel.prototype.addMessage = function(from, message) {
    var date = new Date();
    var conversation = new Conversation(from, date, message);
    this.conversations.push(conversation);

    if (this.active) {
        $(".content").prepend(conversation.template());
        $(".chatbox").html("");
    } else {
        this.hasNotifications = true;
        this.classes.push("has-notifications");
        $("."+this.id).addClass("has-notifications");
    }

    var $this = this;
    this.followers.forEach(function(follower) {
        setTimeout(function() { follower.onConversation(conversation, $this); },
            1000 + Math.random() * 1500)

    });
}

Channel.prototype.renderConversation = function() {
    this.conversations.forEach(function(conversation) {
        $(".content").prepend(conversation.template());
    })
}

Channel.prototype.activate = function() {
    active_chat.deactivate();
    active_chat = this;

    this.active = true;
    let handle = "#";

    if (this.type === "user") { handle = "@"; }
    if (this.hasNotifications) { $("." + this.id).removeClass("has-notifications"); }

    $("." + this.id).addClass("active");

    this.renderConversation();

    $(".chatbox").attr("placeholder", "Message " + handle + this.name);
    $(".user-header").append(this.header_template());
    $(".profile").append(this.profile_template());

    $(".header").on('click', function() {
        $(".profile").toggle();
        $(".chatbox").toggleClass("push-left");
        $(".content").toggleClass("push-left");
    });
}

Channel.prototype.deactivate = function() {
    this.active = false;

    $("." + this.id).removeClass("active");
    $(".content").empty();
    $(".user-header").empty();
    $(".profile").empty();
}

Channel.subscribe = function(name, scenario) {
    name = name.toLowerCase()
    var channel = Channel.findChannel(channels, name);

    if(!channel) {
        channel = Channel.findOrCreateUserChannel(name, false)
    }

    channel.followers.push(scenario);

    return channel
}

Channel.unsubscribe = function(name, scenario) {
    var channel = Channel.findChannel(channels, name);

    channel.followers.splice(channel.followers.indexOf(scenario), 1);
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

Channel.findOrCreateUserChannel = function(name, active) {
    var channel = Channel.findChannel(channels, name.toLowerCase())

    if(!channel) {
      var channel = new Channel(name, active, [], false, "user")
      channels.push(channel)
    }

    $(".users-list").append(channel.template());

    return channel
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
