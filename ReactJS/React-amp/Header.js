import React from "react";

class Header extends React.Component{

  render() {
    const
      {activeDomain, sideBars, postUrl} = this.props,
      listenLiveUrl = "//" + activeDomain + "/listen-live/popup/",
      logoLink = "//" + activeDomain;
    //console.log(activeDomain);
    return (
      <header className="amp-header clearfix">
        <a href={logoLink} className="logo-wrapper"></a>
        { ( sideBars && sideBars.length > 0 ) &&
          <a href={listenLiveUrl}>
            <figure className="listen-live-btn">
              <button name="play"></button>
            </figure>
          </a>
        }
      </header>
    );
  }
}

export default Header;