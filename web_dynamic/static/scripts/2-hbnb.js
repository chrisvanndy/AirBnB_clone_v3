/* This script listens to clicks on amenities and updates DOM */
$(document).ready(function(){
  let amenities = {} 
    $('input').click(function(){
      $(':input').each(function(){
        if (this.checked === true) {
          amenities[this.data('name')] = this.data('id');
      } else {
          delete.amenities[this.data('name')];
        });
      let arr = [];
      for (const key in amenities){
      if amenities.hasOwnProperty(key)){
        arr.push(key);
      }
     }
   $('.amenities h4').html(arr.join(', '));
  });
});

$.getJSON('http://0.0.0.0:http://ae07eaee389a.b594c0bb.hbtn-cod.io/5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
