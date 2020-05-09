import React from "react";
import get from "lodash/get";
import Ad from "./ArticleComponents/Ad.js";
import NavItem from "./NavItem";

class Footer extends React.Component{

  getMenuItems(indexs, details){
    let
      menu = [];
    indexs.forEach(( indx, i ) => {
      const
        x = i + 1;
      if( details[ x ] && details[ x ].attrs && details[ x ].attrs.title ){
        menu.push( <NavItem {...details[ x ]} indexs={indexs[i]} subMenu={details} /> );
      }
    });
    return menu;
  }

  render() {
    const
      {adTargetInfo} = this.props,
      stationInfo = get(this.props, "stationInfo"),
      indexs = get(this.props, `footerNav.data`) || [],
      details = get(this.props, `footerNav.dataDetails`) || {};

    return (
      <footer>
        <div className="amp-footer">
          <ul className="footer-nav">
            {this.getMenuItems(indexs, details)}
          </ul>
          <Ad width="320" height="50" {...stationInfo} adTargetInfo={adTargetInfo} size="flex" position="320b,320c" id="footer-ad" />
        </div>
      </footer>
    );
  }
}

export default Footer;