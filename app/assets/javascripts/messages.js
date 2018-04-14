$(function(){
  function buildHTML(comment) {
    var image = ((comment.image) ? `<img src= ${comment.image} >`: "");
    var html =`<div class='comment' data-id= ${comment.id}>
                  <h4 class='comment__user-name'>
                    ${comment.user_name}
                  </h4>
                  <ul class='comment__date clearfix'>
                    <li>
                      ${comment.created_at}
                    </li>
                  </ul>
                  <p class='comment__text'>
                    ${comment.content}
                  </p>
                    ${image}
                </div>`
    $('.chat-main').append(html);
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').val('');
      $('.upload-icon').val('');
      $('.sent-bottun').prop('disabled', false);
      $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('コメントを入力してください');
      $('.sent-bottun').prop('disabled', false);
    })
  });

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var comment_id = $('.comment:last').data('id');
      var href = window.location.href;
      $.ajax({
        url: href,
        type: "GET",
        data: {
          message: { id: comment_id}
        },
        dataType: 'json',
      })
      .always(function(message){
        if (message.length !== 0) {
          message.forEach(function(message){
            buildHTML(message);
          });
          $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
        } else {
          console.log('新規メッセージなし')
        }
      })
    } else {
      clearInterval(interval);
  }},2000);
});
