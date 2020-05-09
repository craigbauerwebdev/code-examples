import React from "react";
import get from "lodash/get";
import Ad from "./ArticleComponents/Ad.js";
import Banner from "./ArticleComponents/Banner";
import ArticlePods from "./ArticleComponents/ArticlePods";
import ShareTools from "./ArticleComponents/ShareTools.js";
import Comments from "./ArticleComponents/Comments.js";
import RelatedArticles from "./ArticleComponents/RelatedArticles";
import Zergnet from "./Zergnet";

class Article extends React.Component{
  render() {
    const
      { postUrl, domain, nextArticle, accent, mainNav, proto, adVars, stationInfo, adTargetInfo, showComments } = this.props,
      relatedArticles = get(this.props, "next.latest") || "";

    return (
      <div className="article-wrap">
        {/*React.version*/}
        <Banner {...this.props} domain={domain} stationInfo={stationInfo} />
        <ShareTools {...this.props} />
        <ArticlePods {...this.props} adTargetInfo={adTargetInfo} domain={domain} size="flex" />
        <Ad width="300" height="250" {...stationInfo} adTargetInfo={adTargetInfo} size="flex" position="320b,320c" id="below-article-ad" />
        <div className="next-article-wrap">
          <a href={nextArticle} className="next-article">NEXT ARTICLE</a>
        </div>
        {showComments && <Comments postUrl={postUrl} />}
        <RelatedArticles next={relatedArticles} accent={accent} domain={domain} proto={proto} />
        <Zergnet adVars={adVars} />
        <amp-sticky-ad layout="nodisplay">
          <Ad width="320" height="50" {...stationInfo} adTargetInfo={adTargetInfo} size="small" position="expand,320h" sticky={true} id="sticky-ad" />
        </amp-sticky-ad>
      </div>
    );
  }
}

export default Article;