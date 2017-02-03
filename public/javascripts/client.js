var main = function() {

  $('.new-quote').on('click', function() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        url: '/retrieveQuotes',
        success: function(data) {
          $('#quote-item').html(data);
            }
    });
  });

  $('.tweet-quote').on("click", function() {
    var tweet = {
      quote: $('#quote-item').text()
    };
    var quote = JSON.stringify(tweet);
    console.log(quote);
        
    $.ajax({
      type: 'POST',
      data: quote,
      dataType: 'json',
      contentType: 'application/json',
      url: '/tweet'
    });
  });
};

$(document).ready(main);
