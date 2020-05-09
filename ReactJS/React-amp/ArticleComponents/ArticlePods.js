import React from "react";
import {Pods} from ".";
import {MarkupHelper} from "../../utils/markup";

class ArticlePods extends React.Component{
  render() {
    const
      { podContent, id, stationInfo, adTargetInfo, domain, postUrl } = this.props,
      content = MarkupHelper.createInnerHtmlFromPodContent( podContent, id, Pods, stationInfo, adTargetInfo, domain, postUrl );

    return (
      <div className="main-article-content">
        {content}
      </div>
    );
  }
}

export default ArticlePods;