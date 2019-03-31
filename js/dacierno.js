var dacierno = dacierno || {

    player: {
        play: function (e) {
            var $this = $(e);
            var $parent = $this.parent().parent();
            var src = $parent.data('src');
            var title = $parent.children()[1].innerHTML;
            if ($this.hasClass('fa-play')) {
                $under.player.load(src, title);
                $under.player.play();
            } else {
                $under.player.pause();
            }
            $this.toggleClass('fa-play').toggleClass('fa-pause');
        },

        next: function () {
            var $this = $('[data-src=' + $under.player.element.src + ']');
            console.log($this);
        },

        events: function () {
            $($under.player.element).on('ended', dacierno.player.next);
        },

        init: function () {
            dacierno.player.events();
        }
    },

    openPage: function () {
        $('.container.open:not(.hide)').off('scroll').on('scroll', dacierno.background.update).scroll();
    },

    background: {
        default: 'https://i.imgur.com/7edvN0R.jpg',
        elements: [],
        actives: [],
        update: function () {
            var $container = $('.container.open:not(.hide)');
            if ($container) {
                var index = Math.floor(Math.max($container.scrollTop() + ($(window).height() / 3), 0) / $(window).height()),
                    $img = $($($container.children()[0]).children()[index]).find('img'),
                    src = $img.data('background') || $img.attr('src') || dacierno.background.default,
                    pos = $img.data('position') || '0% 100%';
                if ($('body').css('backgroundImage') !== 'url(' + src + ')' && !~dacierno.background.actives.indexOf(src)) {
                    dacierno.background.elements[index] = dacierno.background.elements[index] || $('<div></div>').addClass('background');    
                    dacierno.background.actives[index] = src;
                    $('body').append(dacierno.background.elements[index]);
                    dacierno.background.elements[index].css({
                        backgroundImage: 'url(' + src + ')',
                        backgroundPosition: pos
                    }).animate({
                        opacity: 1
                    }, 500, function () {
                        $('body').css({
                            backgroundImage: 'url(' + src + ')',
                            backgroundPosition: pos
                        });
                        dacierno.background.elements[index].remove();
                        dacierno.background.elements[index] = null;
                        dacierno.background.actives[index] = null;
                    });
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
        dacierno.player.init();
    }
};

$(dacierno.init);