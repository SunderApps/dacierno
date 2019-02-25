/**
 *  TRIGONOMETRY NOTES:
 *
 *  Given:
 *                  frequency - value given through Audio API
 *                  angle     - angle of the line being drawn relative to the x-axis
 *                  radius    - radius of the inner circle
 *
 *  Triangles:
 *                  inner_adj - adjacent side of the angle of the inner circle
 *                  inner_opp - opposite side of the angle of the inner circle
 *                  outer_adj - adjacent side of the angle of the outer circle
 *                  outer_opp - opposite side of the angle of the outer circle
 *
 *  Line Points:
 *                  inner_x   - x-value of the starting point of the line
 *                  inner_y   - y-value of the starting point of the line
 *                  outer_x   - x-value of the ending point of the line
 *                  outer_y   - y-value of the ending point of the line
 *
 *  Calculations:
 *                  inner_adj = radius * cos(angle)
 *                  inner_opp = radius * sin(angle)
 *                  outer_adj = frequency * cos(angle)
 *                  outer_opp = frequency * sin(angle)
 *
 *                  inner_x   = inner_adj
 *                  inner_y   = inner_opp
 *                  outer_x   = inner_adj + outer_adj
 *                  outer_y   = inner_opp + outer_opp
 */

 var dacierno = dacierno || {};
 dacierno.vis = dacierno.vis || {
    context: {},
    source: {},
    analyser: {},
    frequency: {},

    halo: {
        options: {
            width: 500,            // Width of canvas
            height: 500,           // Height of canvas
            numBars: 1028,         // Number of visualizer bars
            radius: 30,            // Radius of the inner circle
            base: 0,               // Constant added to line length
            strength: 1,           // Multiplier for line length,
            canvas: {},            // The canvas to draw on
            context: {},           // The context to do the drawing
        },
        renderFrame: function (timestamp) {
            // Clear the visualizer
            dacierno.vis.halo.options.context.clearRect(0, 0, dacierno.vis.halo.options.width, dacierno.vis.halo.options.height);

            // For each bar
            for (var i = 0; i < dacierno.vis.halo.options.numBars; i++) {

                // Calculate the length of the bar
                // length = average of the percentile this group represents
                var length = 0;
                for (var j = Math.floor(i * (dacierno.vis.frequency.length / dacierno.vis.halo.options.numBars)); j < Math.floor((i + 1) * (dacierno.vis.frequency.length / dacierno.vis.halo.options.numBars)); j++) {
                    length += dacierno.vis.frequency[j];
                }
                length /= (dacierno.vis.frequency.length / dacierno.vis.halo.options.numBars);
                length *= dacierno.vis.halo.options.strength;
                length += dacierno.vis.halo.options.base;

                // Calculate the points of the line SohCahToa!
                var vector = {
                    'x1': dacierno.vis.halo.options.radius * Math.cos((6.2831 / dacierno.vis.halo.options.numBars) * i),
                    'y1': dacierno.vis.halo.options.radius * Math.sin((6.2831 / dacierno.vis.halo.options.numBars) * i),
                    'x2': (dacierno.vis.halo.options.radius + length) * Math.cos((6.2831 / dacierno.vis.halo.options.numBars) * i),
                    'y2': (dacierno.vis.halo.options.radius + length) * Math.sin((6.2831 / dacierno.vis.halo.options.numBars) * i)
                };

                // Draw the line
                if (i % 5 === 0) {
                    dacierno.vis.halo.options.context.strokeStyle = 'rgb(' + (Math.random() % 50 * i) + ',' + (Math.random() % 50 * i) + ',' + (Math.random() % 50 * i) + ')';
                }
                dacierno.vis.halo.options.context.beginPath();
                dacierno.vis.halo.options.context.moveTo(vector.x1 + dacierno.vis.halo.options.width / 2, vector.y1 + dacierno.vis.halo.options.height / 2);
                dacierno.vis.halo.options.context.lineTo(vector.x2 + dacierno.vis.halo.options.width / 2, vector.y2 + dacierno.vis.halo.options.height / 2);
                dacierno.vis.halo.options.context.stroke();

            }
        },

        init: function () {
            dacierno.vis.halo.options.canvas = document.getElementById('visualizer_halo');
            dacierno.vis.halo.options.context = dacierno.vis.halo.options.canvas.getContext('2d');        
        }
    },

    lines: {
        options: {
            numLines: 9,           // Number of lines
            width: 1000,           // Width of canvas
            height: 500,           // Height of canvas
            base: 0,               // Constant added to line angles
            strength: 1,           // Multiplier for line angles
            canvas: {},            // The canvas to draw on
            context: {},           // The context to draw with
        },
        renderFrame: function (timestamp) {
            // Clear the visualizer
            dacierno.vis.lines.options.context.clearRect(0, 0, dacierno.vis.lines.options.width, dacierno.vis.lines.options.height);

            // For each line
            for (var i = 0; i < dacierno.vis.lines.options.numLines; i++) {

                // Change direction more on later lines
                var num_steps = (i % 2 === 0 ? Math.pow(i, 2) : Math.pow(i - 1, 2)) + 4;
                var step = dacierno.vis.lines.options.width / num_steps;

                // Begin the line
                dacierno.vis.lines.options.context.beginPath();
                dacierno.vis.lines.options.context.moveTo(0, dacierno.vis.lines.options.height / 2);

                // Random color for this line
                dacierno.vis.lines.options.context.strokeStyle = 'rgb(' + (Math.random() % 50 * 5) + ',' + (Math.random() % 50 * 5) + ',' + (Math.random() % 50 * 5) + ')';

                // For each step
                var dir = i % 2 === 0 ? 1 : -1;
                for (var j = 0; j <= dacierno.vis.lines.options.width; j += step) {

                    // Calculate the height of the curve
                    let vals_per_step = (dacierno.vis.frequency.length / dacierno.vis.lines.options.numLines) / num_steps;
                    var height = 0;
                    for (var k = Math.floor((j / step) * vals_per_step); k < Math.floor(((j / step) * vals_per_step) + vals_per_step); k++) {
                        if(k < 1028)
                        height += dacierno.vis.frequency[k];
                    }
                    height /= (vals_per_step);
                    height *= dacierno.vis.lines.options.strength;
                    height += dacierno.vis.lines.options.base;
                    height *= dir;
                    dir *= -1;
                    height += dacierno.vis.lines.options.height / 2;

                    // Draw an arc to the next point
                    dacierno.vis.lines.options.context.quadraticCurveTo(step / 2 + j, height, j + step, dacierno.vis.lines.options.height / 2);
                }

                // Draw the line
                dacierno.vis.lines.options.context.stroke();
            }
        },

        init: function () {
            dacierno.vis.lines.options.canvas = document.getElementById('visualizer_lines');
            dacierno.vis.lines.options.context = dacierno.vis.lines.options.canvas.getContext('2d');        
        }
    },

    renderFrame: function (timestamp) {
        // If the audio is paused, pause the animation
        if ($under.player.element.paused) { return; }

        // Get the next frame
        requestAnimationFrame(dacierno.vis.renderFrame);
        dacierno.vis.analyser.getByteFrequencyData(dacierno.vis.frequency);

        // Run the visualizers
        dacierno.vis.options.halo.renderFrame();
        //dacierno.vis.options.lines.renderFrame();
    },

    init: function () {
        // Load default audio
        $under.player.load('../mp3/cato/petrichor.mp3', 'Petrichor');

        // Initialize Audio Analysis
        dacierno.vis.context = new AudioContext();
        dacierno.vis.source = dacierno.vis.context.createMediaElementSource($under.player.element);
        dacierno.vis.analyser = dacierno.vis.context.createAnalyser();
        dacierno.vis.source.connect(dacierno.vis.analyser);
        dacierno.vis.source.connect(dacierno.vis.context.destination);
        dacierno.vis.frequency = new Uint8Array(dacierno.vis.analyser.frequencyBinCount);

        // Initialize Visualizer Objects
        dacierno.vis.halo.init();
        dacierno.vis.lines.init();

        // Run visualizer on play
        $under.player.element.onplay = dacierno.vis.renderFrame;
    }
 };

 $(dacierno.vis.init);