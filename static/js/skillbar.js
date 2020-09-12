$(document).ready(function () {

/**
* A function to check when an element is scrolled into view
* When scrolled into view run animate function on skillbar
* Credit: https://stackoverflow.com/questions/9578348/best-way-to-execute-js-only-on-specific-page
 */
    $(window).scroll(function(){
    function elementScrolled(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }

    // Credit: https://codepen.io/tamak/pen/hzEer?html-preprocessor=pug
    if(elementScrolled('#skills-col')) {
        $(".skill").each(function () {
        $(this)
        .find(".skillbar")
        .animate(
            {
            width: $(this).attr("data-percent"),
            },
            6000
        );
    });

    }
    });
});