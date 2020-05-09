import React from "react";
//import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";

/* Progress Bar */
class ProgressBar extends React.Component{
  constructor( props ){
    super( props );
    this.handleSliderDrag = this.handleSliderDrag.bind(this);
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  convertSeconds(sec){
    const hrs = Math.floor(sec / 3600);
    const min = Math.floor((sec - (hrs * 3600)) / 60);
    let seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100;
   
    let result = (hrs < 10 ? "0" + hrs : hrs);
    result += ":" + (min < 10 ? "0" + min : min);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  }

  handleSliderDrag(event){
    this.setState({value: event.target.value});
    this.props.updateTrackPosition(event.target.value);
  }

  render(){
    const 
      { currentTime, trackDuration, type } = this.props,
      newCurrentTime = Math.floor(currentTime),
      progress = parseFloat(((newCurrentTime / trackDuration) * 100).toFixed(4)) + '%',
      progNum = parseFloat(((newCurrentTime / trackDuration) * 100).toFixed(4));

      if(type === "full") {
        return( 
          <div className="progress">
            <span className="lapsed">{this.convertSeconds(newCurrentTime)}</span>
            <span className="bar">
              <input className="input-range" onChange={() => this.handleSliderDrag(event)} type="range" min="0" max="100" value={progNum} step="1" />
            </span>
            <span className="duration">{this.convertSeconds(trackDuration)}</span>
          </div>
        )}
      else {
        return (
          <div class="simple-progress-bar">
            <div className="progress" style={{width: progress}}></div>
          </div>
        )
      }
  }
}

export default ProgressBar;