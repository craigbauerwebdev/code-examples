import React from "react";
import get from "lodash/get";
import renderHTML from "react-render-html";

class Title extends React.Component{

  render() {
    const
      title = get(this.props, `title`).toUpperCase();
    return (
      <div className="title-wrap">
        <h1 className="article-title">{renderHTML(title)}</h1>
      </div>
    );
  }

}

export default Title;