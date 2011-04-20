/**
 * Sap v1.0.1
 * 
 * Inspired by Contained Sticky Scroll v1.1 By Matt Ward
 * http://blog.echoenduring.com/2010/11/15/freebie-contained-sticky-scroll-jquery-plugin/
 *
 * (c) 2011 Forrst, LLC
 */
(function($) {

    $.fn.sap = function(options) {
  
    var defaults = {  
        distanceFromTheTop: 0,
        distanceFromTheBottom: 0
    };  
                  
    options = $.extend(defaults, options);
    
    var $objizzle = $(this);
    
    var oldTop = $objizzle.offset().top;
    var width  = $objizzle.width() + 'px';
    var $shim  = $('<div class="sap-shimy-shim"></div>');
    var theWindow = $(window);
    
    theWindow.scroll(function() {

        var top = theWindow.scrollTop();
        var docheight = $(document).height();
        var offset = (top + options.distanceFromTheTop + $objizzle.height()) - (docheight - options.distanceFromTheBottom);
        
       

        // top + options.distanceFromTheTop + objizzle.height() gives the absolute distance to the
        // bottom of the object. When this is greater than docheight - options.distanceFromTheBottom
        // start decrementing the top value by the offset
        
        var newTop = 0;

        if ((top + options.distanceFromTheTop) > $objizzle.offset().top)
        {   
           

            if (offset < 0) {
                newTop = options.distanceFromTheTop;
            }
            else {
                console.log("success");
                newTop = options.distanceFromTheTop - offset;
            }

            $objizzle.css({
                position: 'fixed',
                width: width,
                top: newTop + 'px'
            });
            
            $shim.css({width: width, height: $objizzle.height()});
            
            $objizzle.before($shim);

        }
        else if (top + options.distanceFromTheTop < oldTop) 
        {
            $shim.remove();
            $objizzle.css({
                position: 'relative',
                width: width,
                top: ''
            });
        }
    });
  };
}(jQuery));
