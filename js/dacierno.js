var dacierno = dacierno || {

    background: function () {
        var $container = $('.container.open:not(.hide)');
        if ($container) {
            var index = $container.scrollTop() / $container.height() * $container.children().length;
            console.log(index);
        }
    },

    events: function () {
        $under.$erver.on('$-open-page', dacierno.background);
        $('.container').on('scroll', dacierno.background);
    },

    init: function () {
        $under.history.title = 'D\'Acierno';
        $under.progress.color = '#f65b0b';
        dacierno.events();
    }
};

$(dacierno.init);