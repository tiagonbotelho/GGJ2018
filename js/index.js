
$(document).ready(function() {
    var company = new Company(30)
    window.company = company

    company.generate()

    window.level = 1

    var channels = []
    window.channels = channels

    channels.push(new Channel("general",      false, [], true, "channel"))
    channels.push(new Channel("random",       false, [], false, "channel"))
    channels.push(new Channel("support",      false, [], false, "channel"))
    channels.push(new Channel("operations",   false, [], false, "channel"))
    channels.push(new Channel("marketing",    false, [], false, "channel"))
    channels.push(new Channel("emergency",    false, [], false, "channel"))

    window.active_chat = channels[0];
    active_chat.activate();

    $("#username").html(company.player.name);

    Channel.getChannels(channels).forEach(function(channel) {
        $(".channel-list").append(channel.template());
    });

    Channel.getUsers(channels).forEach(function(user) {
        $(".users-list").append(user.template());
    });

    $(document).on('click', ".user", function(_) {
        let clicked_user = Channel.findChannel(channels, this.children[0].innerHTML);

        if (clicked_user !== active_chat) {
            active_chat.deactivate();
            clicked_user.activate();
            active_chat = clicked_user;
        }
    });

    $(document).on('click', ".channel", function(_) {
        let clicked_channel = Channel.findChannel(channels, this.children[0].innerHTML);

        if (clicked_channel !== active_chat) {
            clicked_channel.activate();
        }
    });

    $(".chatbox").keypress(function(e) {
        let key = e.which;

        if (key === 13) {
            e.preventDefault();
            active_chat.addMessage(company.player, this.innerHTML);
        }
    });

    new WelcomeScenario()
});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
