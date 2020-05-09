import React from "react";
//import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";
import PodcastDate from "./PodcastDate";
import Touch from "../generalpurpose/Touch";
import PodcastPlayIcon from "../icons/PodcastPlayIcon";
import GraphEq from "../icons/GraphEq";
import LoadingAnim from "../generalpurpose/LoadingAnim";

/* Podcast Track */
class PodcastTrack extends React.Component{

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  truncateDescription( str, num ) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  handleSwipe = ( direction ) => {
    this.props.loadDetails(this.props.trackData, "swipe", direction);
  }

  launchPopup = () => {
    const
      origin = window.location.origin;
    window.open( origin + "/podcast/popup/?id=" + this.props.id + "&item=" + this.props.trackData.index + "&theme=dark&playertype=player", "Podcast Player", "width=400,height=600");
  }

  render(){
    const 
      { trackData, createNewAudio, currentIndex, playerStatus, loadDetails, playerType, loaded } = this.props,
      isPlaying = currentIndex === trackData.index,
      duration = get(this.props, `trackData.duration`),
      minutes = Math.floor(duration / 60),
      description = get(trackData, `description`),
      truncatedDescription = this.truncateDescription(description, 110);
    let
      outlineStyle;
    if( isPlaying ){
      outlineStyle = "primary-color-style"
    } else {
      outlineStyle = ""      
    }
    if(playerType && playerType === "player") {
      return(
        <Touch onSwipe={this.handleSwipe}>
          <li className={outlineStyle}>
            <div className="info" onClick={createNewAudio.bind(this, trackData)}>
              <div className="track-meta clearfix">
                {/*<p className="date">{dateTime}</p>*/}
                <PodcastDate trackData={trackData} />
                <p className="dur-min">{minutes} MIN</p>
              </div>
              <div>
                <div className="title-desc-wrap clearfix">
                  <div className="title-desc">
                    <h3 className="title" dangerouslySetInnerHTML={{__html: trackData.title}}></h3>
                    <p className="description">{truncatedDescription}</p>
                  </div>
                  <div className="play-status">
                    {isPlaying &&
                      <div>
                        <div>
                          {!loaded &&
                            <LoadingAnim key="1" width="20px" strokeWidth="3"/>
                          }
                          {loaded &&
                            <GraphEq animationPlayState={playerStatus} width="40" height="20" />
                          }
                        </div>  
                      </div>
                    }
                  </div>
                </div>
                {description &&
                  <div className="track-meta">
                    <div onClick={loadDetails.bind(this, trackData, "click", "")} className="podcast-details-btn">Details</div>
                  </div>
                }
              </div>
            </div> 
          </li>
        </Touch>
      )
    }
    else {
      return(
        <Touch onSwipe={this.handleSwipe}>
          <li>
            <div className="info" onClick={this.launchPopup}>
              <div className="track-meta clearfix">
                {/*<p className="date">{dateTime}</p>*/}
                <PodcastDate trackData={trackData} />
                <p className="dur-min">{minutes} MIN</p>
              </div>
              <div>
                <div className="title-desc-wrap clearfix">
                  <div className="title-desc">
                    <h3 className="title" dangerouslySetInnerHTML={{__html: trackData.title}}></h3>
                    <p className="description">{truncatedDescription}</p>
                  </div>
                  <div className="play-status">
                    <PodcastPlayIcon buttonWidth="30px" />
                  </div>
                </div>
                <div className="track-meta">
                </div>
              </div>
            </div> 
          </li>
        </Touch>
      )
    }  
  }
}
export default PodcastTrack;