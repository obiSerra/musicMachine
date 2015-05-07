/**
 * Created by roberto on 07/05/15.
 */



var MusicButton = React.createClass({
    render: function() {
        var sound = new MusicPlayer(this.props.soundUrl);

        return (
            <button className={'btn btn-danger music-btn center-block'} onClick={sound.play}>{this.props.name}</button>
        );
    }
});