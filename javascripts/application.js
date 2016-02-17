
(function() {
  'use strict';

  var querySelectorAll = document.querySelectorAll.bind(document);
  var tag = querySelectorAll('.post-tag');

  for(var i = 0; i < tag.length; i++) {
    var tagAttr = tag[i].getAttribute('href');
    if(tagAttr ==='/tag.html#video'){
      tag[i].parentElement.classList.add('post-video');
    }
  }

}());
