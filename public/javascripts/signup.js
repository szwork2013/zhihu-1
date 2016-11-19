        $(".signup-form input").click(function() {
            $(this).popover('destroy');
        });

        $(".signup-button").click(function() {
            $.ajax({
                type: "POST",
                url: "/signup",
                dataType: "json",
                data: $('form.signup-form').serialize(),
                success: function(res) {
                    var msg = "<code>" + res.msg + "</code>";
                    if (res.code == 10000) {
                        window.location = '/active';
                    } else if (res.code == 10004 || res.code == 10002) {
                        $("#signup_email").attr("data-content", msg);
                        $('#signup_email').popover('show');
                    } else if (res.code == 10003||res.code == 10007) {
                        $("#signup_username").attr("data-content", msg);
                        $('#signup_username').popover('show');
                    }
                    else {
                        $("#signup_password").attr("data-content", msg);
                        $('#signup_password').popover('show');
                    }
                },
                error: function() {
                    $("#signup_email").attr("data-content", "未知错误,重新注册");
                    $('#signup_email').popover('show');
                }
            });
        });
