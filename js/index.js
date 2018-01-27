

function getRandomUser() {
    var keys = Object.keys(window.users);
    var name = keys[Math.floor(Math.random() * Math.floor(Object.keys(window.users).length))]
    return window.users[name]
}

$(document).ready(function() {
    users = company.generateUsers(20)
    window.users = users

    var channels = [
        new Channel(1, "general", true, [], true, "channel"),
        new Channel(2, "random", false, [], false, "channel"),
        new Channel(3, "keyboards", true, [], false, "channel"),
        new Channel(4, "marketing", false, [], false, "channel"),
        new Channel(5, "backend", true, [], false, "channel"),

        new Channel(6, getRandomUser().name, false, [], false, "user"),
        new Channel(7, getRandomUser().name, false, [], false, "user"),
        new Channel(8, getRandomUser().name, false, [], false, "user"),
        new Channel(9, getRandomUser().name, false, [], false, "user"),
    ];

    window.channels = channels

    var active_chat = channels[0];
    active_chat.activate();

    Channel.getChannels(channels).forEach(function(channel) {
        $(".channel-list").append(channel.template());
    });

    Channel.getUsers(channels).forEach(function(user) {
        $(".users-list").append(user.template());
    });

    $(".user").on('click', function(_) {
        let clicked_user = Channel.findChannel(channels, this.children[0].innerHTML);

        if (clicked_user !== active_chat) {
            active_chat.deactivate();
            clicked_user.activate();
            active_chat = clicked_user;
        }
    });

    $(".channel").on('click', function(_) {
        let clicked_channel = Channel.findChannel(channels, this.children[0].innerHTML);

        if (clicked_channel !== active_chat) {
            active_chat.deactivate();
            clicked_channel.activate();
            active_chat = clicked_channel;
        }
    });

    $(".chatbox").keypress(function(e) {
        let key = e.which;

        if (key === 13) {
            e.preventDefault();
            let user = Channel.findChannel(channels, $("#username").html());
            active_chat.addMessage(user, this.innerHTML);
        }
    });
});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
