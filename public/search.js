$('#campground-search').on('input', function() {
    var search = $(this).serialize();
    if(search === "search=") {
      search = "all"
    }
    $.get('/books?' + search, function(data) {
      $('#campground-grid').html('');
      console.log(data);
      data.forEach(function(campground) {
        //console.log(campground);
        // $('#campground-grid').append(`
        //   <div class="col-md-3 col-sm-6">
        //     <div class="thumbnail">
        //       <img src="${ campground.images[0] }">
        //       <div class="caption">
        //         <h4>${ campground.title }</h4>
        //       </div>
        //       <p>
        //         <a href="/dogs/${ campground._id }" class="btn btn-primary">More Info</a>
        //       </p>
        //     </div>
        //   </div>
        // `);
      });
    });
  });
  
  $('#campground-search').submit(function(event) {
    event.preventDefault();
  });