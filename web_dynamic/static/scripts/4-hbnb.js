function post (dict) {
    if (dict === undefined) {
      dict = {};
    }
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      method: "POST",
      contentType: 'application/json',
      data: JSON.stringify(dict),
      processData: false,
      dataType: 'json',
      success: function(data) {
      $('.places').html('');
        for (let x = 0; x < data.length; x++) {
          let place = data[x];
          $('.places').append('<article>' +
            '<div class="title_box"><h2>' + place.name +
            '</h2>' +
            '<div class="price_by_night">$' + place.price_by_night + '</div>' +
            '</div>' +
            '<div class="information">' +
            '<div class="max_guest">' + place.max_guest +
            (place.max_guest != 1 ? ' Guests</div>' : ' Guest</div>') +
            '<div class="number_rooms">' + place.number_rooms +
            (place.number_rooms != 1 ? ' Bedrooms</div>' : ' Bedroom</div>') +
            '<div class="number_bathrooms">' + place.number_bathrooms +
            (place.number_bathrooms != 1 ? ' Bathrooms</div>' : ' Bathroom</div>') +
            '</div>' +
            '<div class="description">' + place.description +
            '</div>' +
            '</article>');
        }
      }
    });
  }
  /* This script listens to clicks on amenities and updates DOM */
  $(document).ready(function(){
    post();
    let amenities = {}
      $('input').click(function(){
        $(':input').each(function(){
          if (this.checked === true) {
            amenities[this.data('name')] = this.data('id');
        } else {
            delete amenities[this.data('name')];
          };
        let arr = [];
        for (const key in amenities){
        if (amenities.hasOwnProperty(key)){
          arr.push(key);
        }
       }
     $('.amenities h4').html(arr.join(', '));
    });
  });
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
    $('button').click(function() {
      let newList = []
      for (const key in amenities) {
        newList.push(amenities[key])
      }
      post({ amenities: newList });
    });
  });
