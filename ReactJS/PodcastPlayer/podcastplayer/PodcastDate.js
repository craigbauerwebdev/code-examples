import React from "react";
import shallowCompare from "react-addons-shallow-compare";
import get from "lodash/get";

class PodcastDate extends React.Component{

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  render(){
    const
      { trackData } = this.props, 
      pubDate = Date.parse(trackData.pubdate),
      today = new Date().toString(),
      now = Date.parse(today),
      elapsedTime = now - pubDate,
      current = 
        today.split(" ")[1]+ " " + 
        today.split(" ")[2] + ", " + 
        today.split(" ")[3];
    const 
      currentYear = today.split(" ")[3],
      isWeek = elapsedTime / 1000 / 60 / 60 / 24 / 7;
    let 
      dateTime;
    if(trackData.pubdate === current) {
      dateTime = "TODAY";
    } else if (isWeek < 1){
      if(trackData.pubday === "Mon") {
        dateTime = "MONDAY";
      } else if(trackData.pubday === "Tue") {
        dateTime = "TUESDAY";
      } else if(trackData.pubday === "Wed") {
        dateTime = "WEDNESDAY";
      } else if(trackData.pubday === "Thu") {
        dateTime = "THURSDAY";
      }  else if(trackData.pubday === "Fri") {
        dateTime = "FRIDAY";
      } else {
        dateTime = trackData.pubday;
      }
    } else {
      if(trackData.pubyear === currentYear) {
        dateTime = trackData.pubNoYear;
      } else {
        dateTime = trackData.pubdate;
      }
    }
    return( 
      <p className="date">{dateTime}</p>
    ) 
  }
}

export default PodcastDate;