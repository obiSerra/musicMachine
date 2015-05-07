/**
 * Created by roberto on 08/05/15.
 */

function MusicPlayer (srcUrl) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source;


    function getData() {
        source = audioCtx.createBufferSource();
        request = new XMLHttpRequest();

        request.open('GET', srcUrl, true);

        request.responseType = 'arraybuffer';

        request.onload = function() {
            var audioData = request.response;

            audioCtx.decodeAudioData(audioData, function(buffer) {
                    source.buffer = buffer;

                    source.connect(audioCtx.destination);
                    source.loop = false;
                },

                function(e){"Error with decoding audio data" + e.err});

        };

        request.send();
    }



    this.play = function () {
        getData();
        source.start(0);
    };
}