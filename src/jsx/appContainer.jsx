/**
 * Created by roberto on 07/05/15.
 */

var soundMap = [
    {
        name: 'gun',
        srcUrl: 'data/aug_gun.mp3',
    },
    {
        name: 'sword',
        srcUrl: 'data/sword_sheath.mp3'
    }


];

var AppContainer = React.createClass({

    render: function() {

        btns = soundMap.map(function(snd) {
            return (<div className={'col-lg-2 col-sm-3 col-xs-4'}>
                        <MusicButton soundUrl={snd.srcUrl} name={snd.name} />
                    </div>);
        }.bind(this));

        return (
        <div>
            <div>
                <WaveDisplay />
            </div>

            <div className={'clear-fix buttons-container row' }>
                {btns}
            </div>
        </div>
        );
    }
});


$(document).ready(function () {
    React.render(
        <AppContainer />,
        document.getElementById('content')
    );
})


