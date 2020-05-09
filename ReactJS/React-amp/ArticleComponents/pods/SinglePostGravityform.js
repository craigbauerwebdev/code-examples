import React from "react";
import GenericButton from "./GenericButton";

class SinglePostGravityform extends React.Component{

  render() {
    const{postUrl} = this.props;
    return (
      <GenericButton href={postUrl} title="Click Here For Form" />
    );
  }

}

export default SinglePostGravityform;