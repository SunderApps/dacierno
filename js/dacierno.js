var dacierno = dacierno || {

    open: function () {
        $('.container.open:not(.hide)').off('scroll').on('scroll', dacierno.background).scroll();
    },

    background: function () {
        var $container = $('.container.open:not(.hide)');
        if ($container) {
            var index = Math.floor($container.scrollTop() / ($(window).height() * 0.5));
            console.log(index);
            var src = $container.children()[index].find('img').attr('src');
            $('body').css('backgroundImage', 'url(' + src + ')');
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