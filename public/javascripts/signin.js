$(document).ready(function() {
    $(function() {
        $('[data-toggle="popover"]').popover();
    });

    $(".signin-form input").click(function() {
        $(this).popover('destroy');
    });


    $(".signin-button").click(function() {
        $.ajax({
            type: "POST",
            url: "/signin",
            dataType: "json",
            data: $('form.signin-form').serialize(),
            success: function(res) {
                var msg = "<code>" + res.msg + "</code>";
                if (res.code == 10000) {
                    window.location = '/explore';
                } else if (res.code == 10006) {
                    $("#email").attr("data-content", msg);
                    $('#email').popover('show');
                } else {
                    $("#password").attr("data-content", msg);
                    $('#password').popover('show');
                }
            },
            error: function() {
                $("#email").attr("data-content", "未知错误,重新登录");
                $('#email').popover('show');
            }
        });
    });
});
