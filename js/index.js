var channels = [
    new Channel(1, "general", false, [], false, "channel"),
    new Channel(2, "random", false, [], false, "channel"),
    new Channel(3, "keyboards", true, [], false, "channel"),
    new Channel(4, "marketing", false, [], false, "channel"),
    new Channel(5, "backend", true, [], false, "channel"),
    new Channel(6, "sean", false, [], false, "user"),
    new Channel(7, "tiago", true, [], false, "user"),
    new Channel(8, "douwe", false, [], false, "user"),
    new Channel(9, "zj", false, [], false, "user"),
    new Channel(10, "pablo", true, [], false, "user")
];

var active_chat = channels[0];

$(document).ready(function(){
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
