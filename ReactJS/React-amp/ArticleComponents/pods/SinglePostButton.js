import React from "react";
import GenericButton from "./GenericButton";

class SinglePostButton extends React.Component{

  render() {

    const
      {data} = this.props,
      {href, title} = data;

    return (
      <GenericButton href={href} title={title} />
    );
  }

}

export default SinglePostButton;