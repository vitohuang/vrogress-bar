/**
 * vrogressbar plugin for jQuery
 * Make a element into a progress bar.
 *
 * By vito huang 
 *
 * Please use as you wish at your own risk.
 */

/**
 * Usage:
 *
 * From JavaScript, use:
 *     $(<select>).vrogressbar({width: <w>, height: <h>});
 *     where:
 *       <select> is the DOM node selector, e.g. "div"
 *       <w> is the width of the progress bar 
 *       <h> is the height of the progress bar
 */

(function($) {
    $.fn.vrogressbar = function(options) {
        if (typeof(options) == "string") {
            options = {initValue:options};
        }
        //define defaults
        settings = jQuery.extend({
            width:'900px',
            backgroundColor:'#333',
            height:'30px',
            barColor:'#036',
            textColor:'#fff',
            initValue:'50',
            timeInterval: 50,
            shadow:true
        }, options);


        initialization = function(element,settings) {
        var wrapper = $(element);
        var initId = $.fn.vrogressbar.initId;
        var bar = 'bar'+initId;
        barValueId = bar +'value';
        barTextId = bar +'text';
        barTextValueId = bar+'textvalue';
        wrapper.append('<div id="'+barValueId+'"><div id="'+barTextId+'"><em id="'+barTextValueId+'">0</em>&#37;</div></div>');
        var barValue = jQuery('#'+barValueId,wrapper);
        var barText = jQuery('#'+barTextId,wrapper); 
        var textValue = jQuery('#'+barTextValueId,wrapper);

        wrapperCss = {
            'background-color':settings.backgroundColor,
            'height':settings.height,
            'width':settings.width,
            'position':'relative'
        };

        valueCss = {
            'background-color':settings.barColor,
            'height':settings.height,
            'width':"0%"
        };

        barHeight = parseInt(settings.height.match(/^\d./g)[0], 10);
        heightUnit = settings.height.match(/\w.$/g)[0];
        fontSize = (barHeight/2).toString() + heightUnit;
        tPaddingTop = (barHeight/4).toString() + heightUnit;

        textCss = {
            'position':'absolute',
            'height':settings.height,
            'width':'100%',
            'text-align':'center',
            'top':'0px',
            'left':'0px',
            'font-size':fontSize,
            'padding-top':tPaddingTop,
            'color':settings.textColor
        };

        wrapper.css(wrapperCss);
        barValue.css(valueCss);
        barText.css(textCss);
        
        var i = 0;
        var run = function() {
            if (i <= settings.initValue) {
                barValue.css('width',i+'%');
                textValue.text(i);
                i++;
            } else {
                clearInterval(inter);
            }
        };

        inter = setInterval(run, settings.timeInterval);
        $.fn.vrogressbar.initId += 1;   //increase the inital id

    };
        this.each(function() {
            initialization(this,settings);
        });

        return this;
    };

    $.fn.vrogressbar.initId = 1;
})(jQuery);
