var dacierno = dacierno || {

    openPage: function () {
        $('.container.open:not(.hide)').off('scroll').on('scroll', dacierno.background.update).scroll();
    },

    background: {
        default: 'https://i.imgur.com/7edvN0R.jpg',
        update: function () {
            var $container = $('.container.open:not(.hide)');
            if ($container) {
                var index = Math.floor(Math.max($container.scrollTop() + ($(window).height() / 3), 0) / $(window).height()),
                    $img = $($($container.children()[0]).children()[index]).find('img'),
                    src = $img.data('background') || $img.attr('src') || dacierno.background.default,
                    pos = $img.data('position') || '0% 100%';
                if ($('body').css('backgroundImage') !== 'url(' + src + ')') {
                    var $back = $('<div></div>').addClass('background');    
                    $('body').append($back);
                    $back.css({
                        backgroundImage: 'url(' + src + ')',
                        backgroundPosition: pos
                    }).addClass('show');
                    console.log('show');
                    delay(function () {
                        console.log('done');
                        $('body').css({
                            backgroundImage: 'url(' + src + ')',
                            backgroundPosition: pos
                        });
                        $back.remove();
                    }, 500);
                }
            }
        },
        
        init: function () {

        }
    },

    events: function () {
        $under.$erver.on('$-open-page', dacierno.openPage);
    },

    init: function () {
        $under.history.title = 'D\'Acierno';
        $under.progress.color = '#f65b0b';
        dacierno.events();
        dacierno.background.init();
    }
};

$(dacierno.init);