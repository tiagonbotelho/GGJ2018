var channels = [
    new Channel("general", true, []),
    new Channel("random", false, []),
    new Channel("keyboards", true, []),
    new Channel("marketing", false, []),
    new Channel("backend", true, []),
];

var users = [
    new User("sean", false, [], true),
    new User("tiago", true, [], false),
    new User("douwe", false, [], false),
    new User("zj", false, [], false),
    new User("pablo", true, [], false)
];

$(document).ready(function(){
    var active_chat = users[0];
    $(".chatbox").attr("placeholder", "Message @" + active_chat.name);

    channels.forEach(function(channel) {
        $(".channel-list").append(channel.template());
    });

    users.forEach(function(user) {
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
