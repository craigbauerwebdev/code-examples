import React from "react";
import Ad from "../Ad.js";

class SinglePostArticleAd extends React.Component{
  render() {
    const {stationInfo, adTargetInfo} = this.props;
    return (
      <Ad width="300" height="250" {...stationInfo} adTargetInfo={adTargetInfo} size="flex" position="320b,320c" id="inarticle-ad" />
    );
  }
}
export default SinglePostArticleAd;