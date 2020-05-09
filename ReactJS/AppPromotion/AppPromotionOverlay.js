import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import shallowCompare from "react-addons-shallow-compare";
import {fetchSailthru} from "../../../redux/actions/index";
import BrandedAppPromo from "../BrandedAppPromo";
import Cookies from "../../../../../../common/utils/cookies";
import Fade from "../Fade";
import {fireEvent, gaApiRoot} from "../../../../../../common/api";
import get from "lodash/get";
import Logo from "../Logo";
import slashes from  "../../../../../../../../common/utils/formatters/stripslashes.js";
import SocialOverlayFooter from "./SocialOverlayFooter";
import SocialOverlayHeader from "./SocialOverlayHeader";
import Newsletter from "../Newsletter";
import Overlay from "./Overlay";

class NewsletterOverlay extends React.Component{
  constructor( props ){
    super(props);
    this.collapseOverlay = this.collapseOverlay.bind( this );
    this.state = {
      showOverlay: false
    };
  }

  shouldComponentUpdate( nextProps, nextState ){
    return shallowCompare( this, nextProps, nextState );
  }

  componentDidMount(){
    if( this.props.checkOnLoad ){
      const { socialOverlay, pageUrl } = this.props;
      if(socialOverlay.module === "branded_app_promo") {
        const
          cookies = new Cookies(),
          cookieName = "app-overlay",
          cookieVal = cookies.get( cookieName );
        if (cookieVal == undefined){
          cookies.set( cookieName, pageUrl, {path: "/"});
        }
        else if(!(cookieVal == "completed-bap") && !(cookieVal == pageUrl)) {
          let
            d = new Date();
          d.setTime(d.getTime() + ( 1000 * 24 * 60 * 60 * 1000 ));
          this.openOverlay();
          cookies.set( cookieName, "completed-bap", {
            path:"/",
            expires: d
          });
          this.fireGa( "app promo", "impression", "overlay" );
        }
      } else if(socialOverlay.module === "newsletter") {
        const
          cookies = new Cookies(),
          cookieName = "newsletter-overlay",
          cookieVal = cookies.get( cookieName );
        if (cookieVal == undefined){
          cookies.set( cookieName, pageUrl, {path: "/"});
        }
        else if(!(cookieVal == "completed-newsletter") && !(cookieVal == pageUrl)) {
          let
            d = new Date();
          d.setTime(d.getTime() + ( 1000 * 24 * 60 * 60 * 1000 ));
          this.openOverlay();
          cookies.set( cookieName, "completed-newsletter", {
            path:"/",
            expires: d
          });
          this.fireGa( "newsletter overlay", "impression", "" );
        }
      }
    }
  }

  componentDidUpdate( prevProps ){
    if( typeof window !== "undefined" && this.state.showOverlay){
      let
        elem = ReactDOM.findDOMNode( this ),
        html = elem.querySelector( ".sub-facebook" );
      if( html ){
        let
          fb = html.querySelector( ".fb-like" );

        if( window.FB && fb.getAttribute("fb-xfbml-state") !== "rendered"){
          window.FB.XFBML.parse( elem );
        }
      }
    }

    if( this.props.showOverlay !== prevProps.showOverlay ){
      this.setState({
        showOverlay: this.props.showOverlay
      });
    }
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

  openOverlay(){
    const
      hasApp = get(this.props, `hasApp`),
      isModule = get(this.props, `socialOverlay.module`);
    if (!hasApp && isModule === "branded_app_promo") {
      this.setState({
        showOverlay: false
      });
    } else {
      this.setState({
        showOverlay: true
      });
    }
  }

  collapseOverlay(signupclick){
    if(signupclick !== "signupclick") {
      //const { socialOverlay } = this.props;
      const
        isModule = get(this.props, `socialOverlay.module`);
      if(isModule === "branded_app_promo") {
        this.fireGa( "app promo", "closed", "overlay" );
      }
    }
    this.setState({
      showOverlay: false
    });
    this.props.collapseCallback();
  }

  render(){
    const 
      {options, socialOverlay, socialInfo, socialOverlayId, socialOverlayInfo, blogInfo, logos, internalads, hasApp} = this.props,
      clubName = slashes.stripslashes( get(options, "globalBlogOptions.loyalty_title_" + options.blogId, null) ),
      isModule = get(this.props, "socialOverlay.module");
    let 
      socialOverlayText;
    if (socialOverlayInfo && socialOverlayInfo.text === ""){
      if (clubName !== "null"){
        socialOverlayText = "Sign up to have exclusive " + clubName + " contests, events, coupons, presales, and much more delivered to you for FREE.";
      }
      else {
        socialOverlayText = "Never miss the latest news from " + blogInfo.blogName + ".";
      }
    } else {
      socialOverlayText = socialOverlayInfo.text;
    }
    return(
      <Fade>{this.state.showOverlay && <Overlay className="newsletter-overlay" onClick={this.collapseOverlay}>
        <SocialOverlayHeader subTitle={socialOverlayText} module={isModule} {...{blogInfo, socialOverlayInfo, logos, Logo}}/>
        {(isModule === "branded_app_promo" && !this.props.forceNewsletterOverlay) &&
          <BrandedAppPromo params={socialOverlayInfo} clubName={clubName} blogName={blogInfo.legalName} info={socialOverlayId} onSignupClick={this.collapseOverlay} fireGa={this.fireGa} location="social overlay" />
        }
        {(isModule === "newsletter" || isModule === null || isModule === "" || this.props.forceNewsletterOverlay) &&
          <Newsletter params={socialOverlayInfo} info={socialOverlayId} onSignupClick={this.collapseOverlay} eventFn={this.fireGa} stSource="desktop_social_overlay" location="social overlay"/>
        }
        {(isModule === "newsletter" || this.props.forceNewsletterOverlay && socialInfo.facebookFanpage) && <div className="sub-facebook">
          <div className="fb-like"data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="false"></div>
          <span className="overlay-facebook-text">Like Us On Facebook</span>
        </div>}
        <SocialOverlayFooter {...{options, internalads}} eventFn={this.fireGa}/>
      </Overlay>}
      </Fade>
    );
  }
}

NewsletterOverlay.defaultProps = {
  checkOnLoad: true,
  showOverlay: false,
  collapseCallback: function(){}
};

function mapStateToProps(state) {
  return {
    socialOverlay: get(state, "json.response.options.blogOptions.social_overlay"),
    options: state.json.response.options,
    hasApp: get(state, "json.response.options.scriptVars.smartAppBanner.hasApp")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSailthru
  }, dispatch);
}

export {NewsletterOverlay};
export default connect( mapStateToProps, mapDispatchToProps )(NewsletterOverlay);