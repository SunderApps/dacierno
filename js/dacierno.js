var dacierno = dacierno || {

    init: function () {
        console.log('dacierno.init');
        $under.history.title = 'D\'Acierno';
        $under.progress.color = '#f65b0b';
    }
};

$under(dacierno.init);