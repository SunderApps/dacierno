var dacierno = dacierno || {

    openPage: function () {
        $('.container.open:not(.hide)').off('scroll').on('scroll', dacierno.background.update).scroll();
    },

    background: {
        default: 'https://i.imgur.com/7edvN0R.jpg',
        update: function () {
            var $container = $('.container.open:not(.hide)');
            if ($container) {
                var index = Math.floor(Math.max($container.scrollTop() + ($(window).height() / 3), 0) / $(window).height());
                var src = $($($container.children()[0]).children()[index]).find('img').attr('src');
                $('.body-temp').css('backgroundImage', 'url(' + (src || dacierno.background.default) + ')').addClass('show');
                delay(function () {
                    $('body').css('backgroundImage', 'url(' + (src || dacierno.background.default) + ')');
                    $('.body-temp').removeClass('show');
                }, 300);
            }
        },
        
        init: function () {
            $('body').append($('<div></div>').addClass('body-temp'));
        }
    },

    events: function () {
        $under.$erver.on('$-open-page', dacierno.openPage);
    },

    init: function () {
        $under.history.title = 'D\'Acierno';
        $under.progress.color = '#f65b0b';
        dacierno.events();
    }
};

$(dacierno.init);