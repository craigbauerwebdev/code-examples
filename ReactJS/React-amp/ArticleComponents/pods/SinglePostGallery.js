import React from "react";
import get from "lodash/get";

class SinglePostGallery extends React.Component{

  render() {
    const
      title = get(this.props, "data.title"),
      layout = get(this.props, "data.layout"),
      domain = get(this.props, "domain"),
      url = get(this.props, "data.url"),
      ampUrl = url.replace("/carbon/", "/amp/"),
      fullUrl = "https://" + domain + ampUrl;

    if (layout === ""){
      return (
        <div className="gallery-wrap list-gallery-wrap">
          <h2 className="gallery-title">{title}</h2>
          <amp-list width="auto" height="100" layout="fixed-height" src={fullUrl} items="gallery">
            <template type="amp-mustache" id="gallery-list" className="gallery-template">
              <div dangerouslySetInnerHTML={{__html:"{{#photo}}<div><amp-img alt={{photo-title}} width={{photo-width}} height={{photo-height}} layout=\"responsive\" src={{photo-url}}></amp-img><p>{{photo-excerpt}}</p><h3>{{photo-title}}</h3><div>{{photo-description}}</div></div>{{/photo}}"}}></div>
            </template>
          </amp-list>
        </div>
      );
    } else if (layout === "grid") {
      return (
        <div className="gallery-wrap grid-gallery-wrap">
          <h2 className="gallery-title">{title}</h2>
          <amp-list width="auto" height="100" layout="fixed-height" src={fullUrl} items="gallery">
            <template type="amp-mustache" id="gallery-grid" className="gallery-template">
              <div dangerouslySetInnerHTML={{__html:"{{#photo}}<div><amp-img lightbox=\"hero\" alt={{photo-title}} width={{photo-width}} height={{photo-height}} layout=\"responsive\" src={{photo-url}}></amp-img><p>{{photo-excerpt}}</p><h3>{{photo-title}}</h3><div>{{photo-description}}</div></div>{{/photo}}"}}></div>
            </template>  {/**/}
          </amp-list>
        </div>
      );
    } else if (layout === "fullscreen") {
      return (
        <div className="gallery-wrap fullscreen-gallery-wrap">
          <h2 className="gallery-title">{title}</h2>
          <amp-list width="auto" height="100" layout="fixed-height" src={fullUrl} items="gallery">
            <template type="amp-mustache" id="gallery-fullscreen" className="gallery-template">
              <div dangerouslySetInnerHTML={{__html:"<amp-carousel controls=\"controls\" lightbox width=\"300\" height=\"200\" layout=\"responsive\" type=\"slides\">{{#photo}}<div class=\"slide\"><figure><amp-img lightbox=\"caption\" alt={{photo-title}} width={{photo-width}} height={{photo-height}} layout=\"responsive\" src={{photo-url}}></amp-img><figcaption><h2>{{photo-title}}</h2><br /><p>{{photo-description}}</p></figcaption></figure></div>{{/photo}}</amp-carousel>"}}></div>
            </template>
          </amp-list>
        </div>
      );
    }
  }
}

export default SinglePostGallery;