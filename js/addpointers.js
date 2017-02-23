$(document).ready(function () {
  $.fn.addListviewPointers = function () {
    var that = $(this);
      elemPositionValue = that.offset().top,
      controlHeightWinHeight = elemPositionValue + that.outerHeight() - $(window).height(),
      EventList = 'scrollstart.SHOWBTTNS scroll.SHOWBTTNS',
      marginLeft = (that.width() / 2) - 25;
    var goDown = function () {
        $(document).scrollTop(controlHeightWinHeight + 1);
      },
      goUp = function () {
        $(document).scrollTop(elemPositionValue - 1);
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
                style: 'margin-left:' +marginLeft+ 'px',
                class: 'arrowIco arrowTopIco'
              }))
          )).append( $('<div>', {
                class: 'arrowDown'
              }).html($('<span>', {
                  style: 'margin-left:' +marginLeft+ 'px',
                  class: 'arrowIco arrowDownIco'
              })
            ));       

    // DON'T apply solution for ul element with defined height
    if ( that < $(window).height()) {
      $(document).off(EventList).on(EventList, function () {
        hideIndicators();
      });
      hideIndicators();
    }
    // DO apply solution for UL element with the height NOT defined
    else {
      $('.arrowTop').hide();
      var firstElementClone = that.find('li').data('list-divider') ? that.find('li').data('list-divider').first().clone() : '';
      $(document).off(EventList).on(EventList, function () {
        var controlScrollValue = $(document).scrollTop();
        /*
         *  component top
         */
        if (controlScrollValue < elemPositionValue) {
          toggleIndicators('arrowTop', 'arrowDown');
        }
        /*
         *  component middle
         */
        else if (controlScrollValue > elemPositionValue
                                    && controlScrollValue < controlHeightWinHeight) {          
        /*
         *  add first-child LI clone to DOM 
         */
        if (!!firstElementClone) {
          $('#headerView').html(firstElementClone);
        }
          showIndicators();
        }
        // component bottom
        else if (controlScrollValue >= controlHeightWinHeight) {
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
});