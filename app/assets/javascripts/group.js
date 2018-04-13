$(function(){

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $('#chat-group-users').append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    $('#chat-group-users').append(html);
  }

  $('#user-search-field').on('keyup',function(e){
    e.preventDefault();
    var input = $('#user-search-field').val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $('#chat-group-users').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser('一致するユーザーはいません');
      }
    })
    .fail(function(){
      alert('ユーザーの取得に失敗しました');
    })
  });
});
