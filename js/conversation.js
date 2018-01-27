function Conversation(from, date, message) {
    this.from = from;
    this.date = date;
    this.message = message;
}

Conversation.prototype.parse_date = function() {
    return addZero(this.date.getHours()) + ":" + addZero(this.date.getMinutes());
}

Conversation.prototype.template = function() {
    return `<div class='row message'><span class='time'>${this.parse_date()}</span><span class="name">${this.from.name}</span>${this.message}</div>`;
}
