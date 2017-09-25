$('.slider').each(function() {              // For every slider
    var $this   = $(this);                    // Current slider
  var $group  = $this.find('.slide-viewer'); // Get the slide-group (container)
  var $slides = $this.find('.single-fact-container');       // Create jQuery object to hold all slides
  var buttonArray  = [];                    // Create array to hold navigation buttons
  var timeout;                              // Sets gap between auto-sliding

  function move(newIndex) {          // Creates the slide from old to new one
    var animateLeft, slideLeft;      // Declare variables

    //advance();                       // When slide moves, call advance() again

    // If it is the current slide / animating do nothing
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }

    buttonArray[currentIndex].removeClass('active-fact'); // Remove class from item
    buttonArray[newIndex].addClass('active-fact');        // Add class to new item

    if (newIndex > currentIndex) {   // If new item > current
      slideLeft = '100%';            // Sit the new slide to the right
      animateLeft = '-100%';         // Animate the current group to the left
    } else {                         // Otherwise
      slideLeft = '-100%';           // Sit the new slide to the left
      animateLeft = '100%';          // Animate the current group to the right
    }
    // Position new slide to left (if less) or right (if more) of current
    $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

    $group.animate( {left: animateLeft}, function() {    // Animate slides and
      $slides.eq(currentIndex).css( {display: 'none'} ); // Hide previous slide
      $slides.eq(newIndex).css( {left: 0} ); // Set position of the new item
      $group.css( {left: 0} );               // Set position of group of slides
      currentIndex = newIndex;               // Set currentIndex to the new image
    });
  }



/*  function advance() {                     // Used to set
    clearTimeout(timeout);                 // Clear previous timeout
    timeout = setTimeout(function() {      // Set new timer
      if (currentIndex < ($slides.length - 1)) { // If slide < total slides
        move(currentIndex + 1);            // Move to next slide
      } else {                             // Otherwise
        move(0);                           // Move to the first slide
      }
    }, 4000);                              // Milliseconds timer will wait
  }*/

  $.each($slides, function(index) {
    // Create a button element for the button
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === currentIndex) {    // If index is the current item
      $button.addClass('active');    // Add the active class
    }
    $button.on('click', function() { // Create event handler for the button
      move(index);                   // It calls the move() function
    }).appendTo('.slide-buttons');   // Add to the buttons holder
    buttonArray.push($button);       // Add it to the button array
  });

  //advance();                          // Script is set up, advance() to move it
    $('.single-fact-container').swipe({
        swipe:function(event, direction, distance, duration, fingerCount){
            if (direction === "left"){
                if (currentIndex < ($slides.length - 1)) { // If slide < total slides
                    move(currentIndex + 1);            // Move to next slide
                } else {                             // Otherwise
                    move(0);                           // Move to the first slide
                }
            }
            if (direction === "right"){
                if (currentIndex > 0) { // If slide < total slides
                    move(currentIndex - 1);            // Move to next slide
                } else {                             // Otherwise
                    move($slides.length - 1);                           // Move to the first slide
                }
            }
        },
        threshold:100
    });

});
