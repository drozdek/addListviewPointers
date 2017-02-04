  Element.prototype.showPointers = function(){
        var that = this,
          thatcontrol = that.control,
          elemPositionValue = thatcontrol.position().top,
          controlHeightWinHeight = elemPositionValue + thatcontrol.outerHeight() - $(window).height(),
          EventList = 'scrollstart.SHOWBTTNS scroll.SHOWBTTNS',
          settings = {
            margin  : 20,
            left    : ( $(thatcontrol).width()/2 ) - ( $('.arrowTop').width()/2 )    
         }; 
         var goDown = function(){
            $('body').scrollTop(controlHeightWinHeight+5);
          },      
            goUp = function(){
              $('body').scrollTop(elemPositionValue);
            },          
              hideIndicators = function(){
                 $('.arrowTop, .arrowDown').hide();
              },
                showIndicators = function(){
                   $('.arrowTop, .arrowDown').show();
                },
                  toggleIndicators = function(el1, el2){
                   $('.' + el1).hide(); $('.' + el2).show();
                  };

          thatcontrol
              .prepend( $("<div>", {
                    class: 'arrowTop',
                  }).html($("<div>", {
                      id: "headerView"
                    })).append($("<span>", {
                      class: "arrowIco arrowTopIco"
                    })
                )).append( $("<div>", {
                      class: 'arrowDown',
                    }).append($("<span>", {
                        class: "arrowIco arrowDownIco"
                    })
                  ))
    
        // DON'T apply solution for ul element with defined height
        if (thatcontrol.find('ul').height() < $(window).height() ) {
          $(document).off(EventList).on(EventList, function(){
            hideIndicators();
          });
          hideIndicators();
        }
        // DO apply solution for ul element with the height NOT defined
        else {
          $('.arrowTop').hide();
          var firstElementClone = thatcontrol.find('ul > li').first().clone();      

          if (that.attribute('type') === 'listview') {
              $(document).off(EventList).on(EventList, function(){
                 var controlScrollValue = $(document).scrollTop();
                 // component top
                 if (controlScrollValue < elemPositionValue) {
                   toggleIndicators('arrowTop','arrowDown');
                 }
                   // component middle
                   else if (controlScrollValue > elemPositionValue 
                             && controlScrollValue < controlHeightWinHeight){
                     $('#headerView').html(firstElementClone);
                     showIndicators();
                   }              
                   // component bottom
                     else if(controlScrollValue >= controlHeightWinHeight){
                       toggleIndicators('arrowDown','arrowTop');
                     }
              });    
          }       
        }         
        thatcontrol.on("click", ".arrowTop", function(){
          goUp();
        });
        thatcontrol.on("click", ".arrowDown", function(){
          goDown();
        });                         
  };