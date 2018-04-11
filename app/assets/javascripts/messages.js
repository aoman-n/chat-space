$(function(){
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var input = $('#message_content').val();
    console.log(input);
  });
});
