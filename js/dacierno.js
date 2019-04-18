var dacierno = dacierno || {

    player: {
        play: function (e) {
            var $this = $(e);
            var $parent = $this.parent().parent();
            var src = $parent.data('src');
            var title = $parent.children()[1].innerHTML;
            if ($this.hasClass('fa-play')) {
                $('.fa-pause').addClass('fa-play').removeClass('fa-pause');
                $under.player.load(src, title);
                $under.player.play();
                $this.toggleClass('fa-play').toggleClass('fa-pause');
            } else {
                $under.player.pause();
                $this.toggleClass('fa-play').toggleClass('fa-pause');
            }
        },

        next: function () {
            var src = $under.player.element.src.replace(/.*?[.]com/, '');
            if (src) {
                var $this = $('tr[data-src="' + src + '"]');
                if ($this) {
                    var $next = $this.next();
                    if ($next) {
                        var $play = $next.find('.fa-play');
                        if ($play) {
                            $play.click();
                        }
                    }
                }
            }
        },

        events: function () {
            $($under.player.element).on('ended', dacierno.player.next);
        },

        init: function () {
            dacierno.player.events();
        }
    },

    events: function () {
        
    },

    init: function () {
        $under.history.title = 'D\'Acierno';
        $under.progress.color = '#f65b0b';
        $under.background.lastSrc = 'https://i.imgur.com/7edvN0R.jpg';
        $under.background.lastPos = '0% 100%';
        dacierno.events();
        dacierno.player.init();
    }
};

$(dacierno.init);