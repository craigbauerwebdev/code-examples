import React from "react";
//import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import Touch from "../generalpurpose/Touch";
import PodcastPlayIcon from "../icons/PodcastPlayIcon";
import PodcastPauseIcon from "../icons/PodcastPauseIcon";
import PodcastForwardIcon from "../icons/PodcastForwardIcon";
import ProgressBar from "./ProgressBar";

/* Main Controls */
class PodcastControls extends React.Component{

  componentDidMount(){
    setTimeout(() => {
      this.props.loadNowPlayingDetails(this.props.currentTrack, "swipe", "top");
    }, 500);
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  handleSwipe = ( direction ) => {
    this.props.loadNowPlayingDetails(this.props.currentTrack, "swipe", direction);
  }

  render(){
    const { currentTrack, playerStatus, loadNowPlayingDetails, currentTime, trackDuration, updateTrackPosition } = this.props,
    thumbnail = get(currentTrack, "thumbnail"),
    background = "url(" + thumbnail + ")",
    thumbStyles = {
      backgroundImage: background
    }

    return( 
      <Touch onSwipe={this.handleSwipe}>
        <div className="adhesion-player">
          <ProgressBar currentTime={currentTime} playerStatus={playerStatus} trackDuration={trackDuration} updateTrackPosition={updateTrackPosition} />
          <div className="current-track-controls">
            <div onClick={loadNowPlayingDetails.bind(this, currentTrack, "click", "")}>
              <div style={thumbStyles} className="thumbnail"></div>
              <div className="title-wrap">
                <h2 className="title" dangerouslySetInnerHTML={{__html: currentTrack.title}}></h2>
              </div>
            </div>
            <div className="controls">
              <div className="play-pause clearfix" onClick={this.props.playPause}>
                {playerStatus === "playing" &&
                  <PodcastPauseIcon buttonWidth="40px" />
                }
                {(playerStatus === "paused" || playerStatus === null) &&
                  <PodcastPlayIcon buttonWidth="40px" />
                }
              </div>
              <div className="skip-forward" onClick={this.props.skipAhead}>
                <PodcastForwardIcon buttonWidth="20px" />
              </div>
            </div>
          </div>
          <div className="player-bottom">
            <div className="inner">
              <h3>320x50 (place holder ad)</h3> 
            </div>
          </div>
        </div>
      </Touch>
    );
  }
}

export default PodcastControls;
