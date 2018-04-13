$(function(){

  function searchUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $('#user-search-result').append(html);
  }

  function searchNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    $('#user-search-result').append(html);
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
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          searchUser(user);
        });
      } else {
        searchNoUser('一致するユーザーはいません');
      }
    })
    .fail(function(){
      alert('ユーザーの取得に失敗しました');
    })
  });

  function appendUsers(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-users').append(html);
    }

  $(document).on('click', '.user-search-add', function(){
    $(this).parent().remove();
    var user_id = $(this).data('userId');
    var user_name = $(this).data('userName');
    appendUsers(user_id, user_name);
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});
