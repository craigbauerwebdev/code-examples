import React from "react";
import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import {fireEvent, gaApiRoot} from "../../../../../common/api";
import get from "lodash/get";
import OpenMessageInput from  "../../components/OpenMessageInput";

/* Branded App Shortcode */
class BrandedAppPromo extends React.Component{
  constructor( props ){
    super( props );
  }

  componentDidMount(){
    this.fireGa( "app promo", "impression", "shortcode" );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  fireGa( ec, ea, el ){
    fireEvent({
      data: {
        eventCategory: ec,
        eventAction: ea,
        eventLabel: el
      },
      ga: {
        ids: gaApiRoot.getAccounts( "ids" )
      },
      ca: {},
      pa: {}
    });
  }

  render(){
    const
      siteIcons = get(this.props, "stationLogos"), //|| get(this.props, "stationLogos.web-apps")
      blogName = get(this.props, "blogInfo.legalName"),
      description = get(this.props, "data.desktop_description") || "Download The " + blogName+ " Mobile App",
      {options, blogInfo, hasApp, squareLogo} = this.props;
    let
      appIcon,
      wrapperClass = "branded-app-shortcode-inarticle",
      descWrapLength ="description-wrap desc-short";
    if( squareLogo && squareLogo !== "" ) {
      appIcon = squareLogo + "/?w=100";
    } else {
      appIcon = siteIcons["apple-high-res"] || siteIcons["web-apps"] || siteIcons["apple-ipad"] || siteIcons["apple-low-res"];
    }

    return(
      hasApp ? (
        <div className={wrapperClass}>
          <div className="logo-wrap">
            <img src={appIcon} />
          </div>
          <div className="phone-input">
            <OpenMessageInput {...{options}} descWrapLength={descWrapLength} shortcodeDesc={description} type="shortcode" blogName={blogInfo.legalName} />
          </div>
          <div style={{clear: "both"}}></div>
        </div> ) : null
    );
  }
}

function mapStateToProps(state) {
  return {
    stationLogos: state.json.response.options.blogOptions._station_logos,
    //isSkin: get( state, `ads.adsOOP.isSkin`, false ),
    options: state.json.response.options.blogOptions._station_info,
    hasApp: state.json.response.options.scriptVars.smartAppBanner.hasApp,
    squareLogo: state.json.response.options.blogOptions.design_option_live.square_logo_img
  };
}

export default connect( mapStateToProps )(BrandedAppPromo);
