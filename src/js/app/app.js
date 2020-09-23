// js knowleadge block
var DOMWindow = $(window),
    jsKnowledgeBlk = $('.js-knowledge'),
    jsKnowleadgeStarted,
    jsKnowledgeBlkOffset = jsKnowledgeBlk.offset().top + jsKnowledgeBlk.height() - DOMWindow.height();

function jsKnowlage() {
    var wSpace = $('.js-knowledge'),
        number = $('.js-knowledge__number'),
        percent = number.attr('data-percent'),
        oneStepNumer = 30 * percent / 8;

    for(i = 1; i < 9; i++) {
       number.append('<span>' + parseInt(oneStepNumer * i) + '</span>');
    }

    setTimeout(function(){
        $('.js-knowledge__arrow').css('transform', 'rotate(' + 180 / 100 * percent + 'deg)');
        number.find('> span').addClass('js-knowledge__dynamic-num');
    }, 50);

    jsKnowleadgeStarted = true;
}

function jsKnowledgeInit() {
    if(DOMWindow.scrollTop() >= jsKnowledgeBlkOffset && !jsKnowleadgeStarted) {
        jsKnowlage();
    }
}

// Ready event
$(document).ready(function(){
    jsKnowledgeBlkOffset = jsKnowledgeBlk.offset().top + jsKnowledgeBlk.height() - DOMWindow.height();
    jsKnowledgeInit();
});

// Scroll event
DOMWindow.scroll(function(){
    jsKnowledgeInit();
});
