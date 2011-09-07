$('.videos').each(function(index, videos) {
  var url = 'https://gdata.youtube.com/feeds/api/videos?author=' + $(videos).data('author') +'&max-results=50&alt=json-in-script&callback=?';
  $.getJSON(url, function(data) {
    $(data.feed.entry).each(function(index, item) {
      var video_id = item.id.$t.match(/[\w]+$/i);
      var img_url = item.media$group.media$thumbnail[2].url;
      var title_text = item.title.$t;
      var img = $('<img src="' + img_url + '" width="120" data-video-id="' + video_id + '" /> ');
      img.attr('title', title_text);
      img.css('cursor', 'pointer');

      var div = $('<div></div>')
      div.css('width', '120px');
      div.css('height', '240px');
      div.css('display', 'inline-block');
      div.css('overflow', 'hidden');
      div.css('cursor', 'pointer');
      div.append(img).append('<div>' + title_text + '</div>');

      div.click(function() {
	$('#player').attr('src', "http://www.youtube.com/embed/" + $(this).find('img').data('video-id'));
	$(window).scrollTop($('#player').position().top);
	return false;
      });

      $(videos).append(div).append(' ');
    });
  });
});
