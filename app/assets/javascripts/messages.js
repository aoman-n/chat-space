$(function(){
  function appendHTML(comment) {
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
      if(done.get(content) !== 0){
      appendHTML(data);
    }else{
      alert('コメントを入力してください');
    }
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
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      var commentId = $('.comment:last').data('id');
      $.ajax({
        url: location.href,
        type: "GET",
        data: {
          id: commentId
        },
        dataType: 'json',
      })
      .always(function(messages){
        if (messages.length !== 0) {
          messages.forEach(function(message){
            appendHTML(message);
          });
          $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
        }
      })
    } else {
      clearInterval(interval);
  }},5000);
});
