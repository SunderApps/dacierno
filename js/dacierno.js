var dacierno = dacierno || {

    open: function () {
        $('.container.open:not(.hide)').off('scroll').on('scroll', dacierno.background).scroll();
    },

    background: function () {
        var $container = $('.container.open:not(.hide)');
        if ($container) {
            var index = Math.floor(Math.max($container.scrollTop() + ($(window).height() / 3), 0) / $(window).height());
            var src = $($($container.children()[0]).children()[index]).find('img').attr('src');
            $('body').css('backgroundImage', 'url(' + (src || 'https://i.imgur.com/7edvN0R.jpg') + ')');
            console.log(index);
            console.log(src);
        }
    },

    events: function () {
        $under.$erver.on('$-open-page', dacierno.open);
        
    },

    init: function () {
        $under.history.title = 'D\'Acierno';
        $under.progress.color = '#f65b0b';
        dacierno.events();
    }
};

$(dacierno.init);