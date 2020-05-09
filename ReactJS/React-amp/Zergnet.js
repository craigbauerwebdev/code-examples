import React from "react";
import get from "lodash/get";

class Zergnet extends React.Component{
  render() {
    const
      zergId = get(this.props, "adVars.zergnetId") || "59449";
      // heights="(max-width:360px) 215%, (max-width:400px) 198%, (max-width:475px) 190%, (max-width:600px) 140%, 0%"
    return (
      <div className="clearfix">
        <div className="zergnet-header">AROUND THE WEB</div>
        <div className="zernet-wrap">
          <div className="zernet-inner-wrap">
            <amp-embed
              width="980" height="600"
              heights="(max-width:360px) 200%, (max-width:400px) 175%, (max-width:475px) 180%, (max-width:600px) 100%, 0%"
              layout="responsive"
              type="zergnet"
              data-zergid={zergId}>
            </amp-embed>
          </div>
        </div>
      </div>
    );
  }
}

export default Zergnet;