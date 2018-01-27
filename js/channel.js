function Channel(name, hasNotifications, conversations) {
    this.classes = "channel";
    this.name = name;
    this.hasNotifications = hasNotifications;
    this.conversations = conversations;
}

Channel.prototype.template = function() {
    if (this.hasNotifications) {
        this.classes += " has-notifications";
    }

    return `<div class="${this.classes}"># <span>${this.name}</span></div>`;
}
