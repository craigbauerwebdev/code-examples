import React from "react";
import renderHTML from "react-render-html";

class RelatedArticles extends React.Component{

  render() {

    const
      { next, domain } = this.props;

    console.log("Next: ", next);
    
    if(next.length > 0 && next) {
      return (
        <div className="related-articles">
          <div className="related-articles-header">RELATED ARTICLES</div>
          {next.map((article, i)=>{
            if(article.thumbnail === undefined) {
              article.thumbnail = "http://wkdq.com/files/2011/05/tsm-ev.png";
            }

            const
              trimDate = new Date(article.sortDate.split(" ")[0]),
              postedDate = trimDate.toDateString().split(" ").slice(1).join(" "),
              url = "//" + domain + article.documentUrl,
              articleThumb = article.thumbnail + "?w=100&h=70&fit=crop";

            return (
              <a key={article.postId} href={url}>
                <div className="related-article">
                  <amp-img width="100" height="70" alt="alt" src={articleThumb}></amp-img>
                  <div className="related-articles-title-date">
                    <p>{renderHTML(article.title)}</p>
                    <div className="related-articles-date">{postedDate}</div>
                  </div>

                </div>
              </a>
            );
          })}
        </div>
      );
    } else {
      return(
        <div>
          <p>No Related Articles Availble :(</p>
        </div>
      );
    }
  }
}

export default RelatedArticles;