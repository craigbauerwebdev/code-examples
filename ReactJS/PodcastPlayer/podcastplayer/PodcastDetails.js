import React from "react";
//import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import Touch from "../generalpurpose/Touch";
import PodcastDate from "./PodcastDate";
import PodcastPlayIcon from "../icons/PodcastPlayIcon";
import PodcastPauseIcon from "../icons/PodcastPauseIcon";

class TrackDetails extends React.Component{

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  handleSwipe = ( direction ) => {
    console.log(direction);
    this.props.closeDetails("swipe", direction);
  }

  render(){
    const { closeDetails, trackDetails, theme, playingIndex, createNewAudio, playPause, detailsClass } = this.props,
    title = get(trackDetails, `title`),
    thumbnail = get(trackDetails, `thumbnail`),
    brand = get(trackDetails, `brand`),
    show = get(trackDetails, `show`),
    segment = get(trackDetails, `segment`),
    episode = get(trackDetails, `episode`),
    description = get(trackDetails, `description`),
    playerStatus = get(this.props, `playerStatus`),
    selectedIndex = get(this.props, `trackDetails.index`),
    duration = get(this.props, `trackDetails.duration`),
    minutes = Math.floor(duration / 60);
    return(
      <Touch onSwipe={this.handleSwipe}>
        <div className={"podcast-details " + detailsClass}>
          <div className="inner-content">
            <div onClick={closeDetails.bind(this, "click")} className="close-btn">
              <img src="/public/assets/img/podcastplayer/left-arrow-light.png" />
            </div>
            <div className="thumbnail">
              <img src={thumbnail} />
            </div>
            <div className="top-meta">
              <div className="track-meta clearfix">
                <PodcastDate trackData={trackDetails} />
                <p className="dur-min">{minutes} MIN</p>
              </div>
              <h2 className="details-title" dangerouslySetInnerHTML={{__html: title}}></h2>
              {selectedIndex === playingIndex &&
                <span className="button play-pause" onClick={playPause.bind(this)}>
                  {playerStatus === "playing" &&
                    <PodcastPauseIcon buttonWidth="40px" />
                  }
                  {(playerStatus === "paused" || playerStatus === null) &&
                    <PodcastPlayIcon buttonWidth="40px" />
                  }
                </span>
              }
              {selectedIndex !== playingIndex &&
                <span className="button play-pause" onClick={createNewAudio.bind(this, trackDetails)}>
                  <PodcastPlayIcon buttonWidth="40px" />
                </span>
              }
            </div>
            <p className="description">{description}</p>
            <div className="bottom-meta">
              <p><p className="label">Segment: </p><p classname="info"> {brand}</p></p>
              <p><p className="label">Show: </p><p classname="info"> {show}</p></p>
              <p><p className="label">Brand: </p><p classname="info"> {segment}</p></p>
            </div>
          </div>
        </div>
      </Touch>
    );
  }
}
export default TrackDetails;