import React from "react";
//import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import Touch from "../generalpurpose/Touch";
import PodcastDate from "./PodcastDate";
import PodcastPlayIcon from "../icons/PodcastPlayIcon";
import PodcastPauseIcon from "../icons/PodcastPauseIcon";
import PodcastForwardIcon from "../icons/PodcastForwardIcon";
import PodcastPrevIcon from "../icons/PodcastPrevIcon";
import ProgressBar from "./ProgressBar"

class PodcastNowPlayingDetails extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      autoCollapse: true
    }
    this.cancelAutoCollapse = this.cancelAutoCollapse.bind(this);
    this.closeNowPlayingDetails = this.closeNowPlayingDetails.bind(this);
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  handleSwipe = ( direction ) => {
    console.log(direction);
    this.props.closeNowPlayingDetails("swipe", direction);
  }

  truncateDescription( str, num ) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  cancelAutoCollapse() {
    this.setState({
      autoCollapse: false
    });
  }

  closeNowPlayingDetails() {
    this.props.closeNowPlayingDetails("click")
    this.cancelAutoCollapse();
  }

  render(){
     const { trackDetails, playPause, skipAhead, skipBack, detailsClass, currentTime, trackDuration, updateTrackPosition } = this.props,
     title = get(trackDetails, `title`),
     thumbnail = get(trackDetails, `thumbnail`),
     showName = get(trackDetails, `show`),
     playerStatus = get(this.props, `playerStatus`),
     selectedIndex = get(this.props, `trackDetails.index`);
     if( this.state.autoCollapse && currentTime > 5 ) {
      this.handleSwipe("bottom")
      this.cancelAutoCollapse();
     }

      return(
        <Touch onSwipe={this.handleSwipe}>
          <div className={"podcast-now-playing-details slideUp " + detailsClass}>
            <div className="inner-content">
              <div onClick={this.closeNowPlayingDetails} className="close-btn">
                <img src="/public/assets/img/podcastplayer/down-arrow-dark.png" />
              </div>
              <div className="thumbnail">
                <img src={thumbnail} />
              </div>
              <div className="top-meta">
                <h2 className="details-title">{this.truncateDescription(title, 100)}</h2>
                <p className="description">{showName}</p>
                <PodcastDate trackData={trackDetails} />
              </div>
              <div className="bottom-meta"> 
                <div className="controls">
                  <span className="button prev" onClick={skipBack}>
                    <PodcastPrevIcon buttonWidth="25px" />
                  </span>
                  <span className="button play-pause" onClick={playPause.bind(this)}>
                  {playerStatus === "playing" &&
                    <PodcastPauseIcon buttonWidth="50px" />
                  }
                  {(playerStatus === "paused" || playerStatus === null) &&
                    <PodcastPlayIcon buttonWidth="50px" />
                  }
                  </span>
                  <span className="button next" onClick={skipAhead}>
                    <PodcastForwardIcon buttonWidth="25px" />
                  </span>
                </div>
                <ProgressBar type="full" currentTime={currentTime} playerStatus={playerStatus} trackDuration={trackDuration} updateTrackPosition={updateTrackPosition} />
              </div>
            </div>
          </div>
        </Touch>
      );
  }
}
export default PodcastNowPlayingDetails;