import React from "react";

class SubNavItem extends React.Component{
  getItemMarkup(title, hasSubMenu, url, id) {
    if(hasSubMenu){
      const
        tapId = "tap:"+id+".open";
      return(<li on={tapId}><a className="tap-sub-wrap nav-item">{title} <span className="right-arrow">&raquo;</span></a></li>);
    }
    return(<li><a href={url}>{title}</a></li>);
  }

  isObject (value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  render() {
    const
      {menuId, details, hasSubMenu} = this.props,
      title = details[menuId].attrs.title,
      url = details[menuId].attrs.href,
      subId = title.toLowerCase().replace(/ /g, "-");

    return (
      <div>
        {this.getItemMarkup(title, hasSubMenu, url, subId)}
      </div>
    );
  }
}

export default SubNavItem;