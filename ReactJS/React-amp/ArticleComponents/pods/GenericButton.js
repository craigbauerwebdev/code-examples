import React from "react";

class GenericButton extends React.Component{

  render() {
    const{href, title} = this.props;
    return (
      <div className="button-wrap">
        <a href={href}>
          <button className="orig-article-button">{title}</button>
        </a>
      </div>
    );
  }

}

export default GenericButton;