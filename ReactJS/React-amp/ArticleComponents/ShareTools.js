import React from "react";
import get from "lodash/get";

class ShareTools extends React.Component{
  render() {
    const
      fb = get(this.props, "social.fb.href"),
      tw = get(this.props, "social.tw.href");
    return (
      <div className="share-container clearfix">
        { (fb && tw) &&
          <div>
            <a href={fb} target="_blank">
              <div className="right"><amp-img height="12" width="12" src="http://production.townsquareblogs.com/wp-content/uploads/2018/11/facebookIcon.png"></amp-img>Share</div>
            </a>
            <a href={tw} target="_blank">
              <div className="left"><amp-img height="12" width="14" src="http://production.townsquareblogs.com/wp-content/uploads/2018/09/twitter.png"></amp-img>Tweet</div>
            </a>
          </div>
        }
        { (!fb && !tw) &&
          <div></div>
          /*<p className="error">Missing FB & TW from social</p>*/
        }
      </div>
    );
  }
}

export default ShareTools;