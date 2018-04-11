$(function(){
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    // var input = $('#message_content').val();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    // var url = window.location.href
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});
