$(document).ready(function() {



    var topic_tochoice_html = $("#topic-tochoice-template").html();
    var topic_tochoice_template = Handlebars.compile(topic_tochoice_html);

    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
                ['bold', 'italic'],
                ['link', 'blockquote', 'code-block', 'image'],
                [{
                    list: 'ordered'
                }, {
                    list: 'bullet'
                }]
            ]
        },
        placeholder: '说明你的问题',
        theme: 'snow',
        imageHandler: function(image, callback) {

            var data = new FormData();
            data.append('image', image);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/uploadFile", true);

            xhr.onload = function(oEvent) {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    console.log("return response:" + response);
                    callback(response.link);
                } else {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        callback(e.target.result);
                    };
                    reader.readAsDataURL(image);

                }
            };
            xhr.send(data);

        }
    });

    $("#submit_question").bind("click", function() {
        var question_title = $("#question-title").val();
        var question_explain = JSON.stringify(quill.getContents());
        var topicIds = new Array();
        var hasChoiceTopicId = $("#choiced-topics").children('button');
        for (var i = 0; i < hasChoiceTopicId.length; i++) {
            var _id = $(hasChoiceTopicId[i]).attr("data-id");
            topicIds[i] = _id;
        }
        console.log(question_explain);
        console.log(topicIds);
        console.log(question_title);
        $.ajax({
                url: '/askQuestion',
                type: 'POST',
                dataType: 'json',
                data: {
                    question_title: question_title,
                    question_explain: question_explain,
                    topicIds: topicIds
                },
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });



    $('#question-topic').bind('input propertychange', function(element) {

        var query_word = $(this).val();
        if (query_word != "" && query_word != null) {
            $.ajax({
                url: '/queryTopic',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    query_word: query_word
                },
                success: function(topics) {
                    console.log("xiaochuzhqian" + topics)
                    removeHasChoiceTopic(topics);
                    if (topics.length >= 1) {
                        // console.log(topics)
                        console.log(JSON.stringify(topics, null, 4));
                        $('#topic-tochoice-list').empty();
                        $('#topic-tochoice-list').append(topic_tochoice_template(topics));
                        //给新增li元素绑定click事件
                        bindListener($("#topic-tochoice-list li"), "click", addTopic); //
                    }

                },
                error: function() {}
            });
        } else {
            //当前输入框值为空，则清除下拉列表元素
            $('#topic-tochoice-list').empty();
        }
    });

    $("#askQuestionButton").bind('click', function() {
        console.log('fd')
        aj
        $.ajax({
                url: '/user/isLogin',
                type: 'POST',
                dataType: 'json'
            })
            .done(function(response) {
                if (response.code != 10000) {
                    $('#register-modal').modal('show');
                } else {
                    $('#askquestion-modal').modal('show');
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });

    $(".switch-to-login").bind('click', function() {
        $('#register-modal').modal('hide');
        $('#login-modal').modal('show');

    })

    $(".unable-login").bind('click', function() {
        $('#login-modal').modal('hide');
        $('#reset-password-modal').modal('show');

    })

    $('.reset-to-login').bind('click', function() {
        $('#reset-password-modal').modal('hide');
        $('#login-modal').modal('show');
    })


    /*    $(function() {
            $('#askquestion').modal('show');
        });*/


});

function bindListener(_this, event, callback) {
    _this.bind(event, callback);
}

function addTopic() {
    $('#topic-tochoice-list').empty(); //点击清除话题选择下拉列表
    var name = $(this).attr("data-name");
    var _id = $(this).attr("data-id");
    var element = '<button type="button" class="btn btn-default btn-sm" data-id="' + _id + '">' + name +
        '<span class="glyphicon glyphicon-remove" data-id="' + _id + '"></span></button>'
    var button = $(element);
    $("#choiced-topics").append(button);
    bindListener(button.children('span'), "click", function() {
        button.remove();
    });

}
//移除已经选择的topic,求差集
function removeHasChoiceTopic(topics) {
    var hasChoiceTopicId = $("#choiced-topics").children('button');
    for (var i = hasChoiceTopicId.length - 1; i >= 0; i--) {
        for (var j = 0; j < topics.length; j++) {
            var _id = $(hasChoiceTopicId[i]).attr("data-id");
            if (topics[j]._id == _id) {
                topics.splice(j, 1);
                break;
            }
        }
    }
}
