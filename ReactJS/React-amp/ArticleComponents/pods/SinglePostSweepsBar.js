import React from "react";
import GenericButton from "./GenericButton";

class SinglePostSweepsBar extends React.Component{

  render() {
    const{postUrl} = this.props;
    return (
      <GenericButton href={postUrl} title="Enter Sweepstakes" />
    );
  }

}

export default SinglePostSweepsBar;