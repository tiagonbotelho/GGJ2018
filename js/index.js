var channels = [
    new Channel(1, "general", true, [], true, "channel"),
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

$(document).ready(function(){
    var active_chat = users[0];
    $(".chatbox").attr("placeholder", "Message @" + active_chat.name);

    Channel.getChannels(channels).forEach(function(channel) {
        $(".channel-list").append(channel.template());
    });

    Channel.getUsers(channels).forEach(function(user) {
        $(".users-list").append(user.template());
    });

    $(".user").on('click', function(e) {
        var clicked_user = User.findUser(users, this.children[0].innerHTML);

        if (clicked_user !== active_chat) {
            active_chat.deactivate();
            clicked_user.activate();
            active_chat = clicked_user;
        }
    });

    $(".chatbox").keypress(function(e) {
        var key = e.which;

        if (key === 13) {
            e.preventDefault();
            var user = User.findUser(users, $("#username").html());
            console.log("Adding message to: ", active_chat);
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
