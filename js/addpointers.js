  $.fn.addListviewPointers = function () {
    
    var that = $(this);         
    
    var goDown = function () {
        $(document).scrollTop(that.offset().top + that.outerHeight() - $(window).height());
      },
        
      goUp = function () {
        $(document).scrollTop(that.offset().top - $('[data-role=header]').height());
      },
        
        hideIndicators = function () {
          $('.arrowTop, .arrowDown').hide();
        },
        
        showIndicators = function () {
          $('.arrowTop, .arrowDown').show();
        },
        
          toggleIndicators = function (el1, el2) {
            $('.' + el1).hide();
            $('.' + el2).show();
          };
             
    
      that
        .append( $('<div>', {
              class: 'arrowTop'
            }).html($("<div>", {
                id: 'headerView'
              }).html($("<span>", {
                style: 'margin-left:' +(that.width()/2 - 25)+ 'px',
                class: 'arrowIco arrowTopIco'
              }))
          )).append( $('<div>', {
                class: 'arrowDown'
              }).html($('<span>', {
                  style: 'margin-left:' +(that.width()/2 - 25)+ 'px',
                  class: 'arrowIco arrowDownIco'
              })
            ));       

    // DON'T apply solution for ul element with defined height
    if ( that < $(window).height()) {
      $(document).off('scrollstart.SHOWBTTNS scroll.SHOWBTTNS').
          on('scrollstart.SHOWBTTNS scroll.SHOWBTTNS', function () {
            hideIndicators();
      });
      hideIndicators();
    }
    
    // DO apply solution for UL element with the height NOT defined
    else {
      $('.arrowTop').hide();
      var firstElementClone = that.find('li').data('list-divider') ? 
                that.find('li').data('list-divider').first().clone() : 
                    '';
      
      $(document).off('scrollstart.SHOWBTTNS scroll.SHOWBTTNS').
                      on('scrollstart.SHOWBTTNS scroll.SHOWBTTNS', function () {
        
        /*
         *  component top
         */
        if ($(document).scrollTop() + $('[data-role="header"]').height() < that.offset().top) {
          toggleIndicators('arrowTop', 'arrowDown');
        }
        
        /*
         *  component middle
         */
        else if ( $(document).scrollTop() + $('[data-role="header"]').height() > that.offset().top
                      && $(document).scrollTop() + $('[data-role="header"]').height() < 
                                                  that.offset().top + that.outerHeight() - $(window).height()) {       
          
        /*
         *  add first-child LI clone to DOM 
         */
        if (!!firstElementClone) {
          $('#headerView').html(firstElementClone);
        }
          showIndicators();
        }
        
        /*
         *  component bottom
         */
        else if ($(document).scrollTop() + $('[data-role="header"]').height() >= 
                                                    that.offset().top + that.outerHeight() - $(window).height()) {
          toggleIndicators('arrowDown', 'arrowTop');
        }
        
      });
    }
    
    that.on("click", ".arrowTop", function () {
      goUp();
    });
    
    that.on("click", ".arrowDown", function () {
      goDown();
    });
    
  };
