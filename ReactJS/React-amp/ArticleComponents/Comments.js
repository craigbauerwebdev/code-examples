import React from "react";
//import get from "lodash/get";

class Comments extends React.Component{
  render() {
    const {postUrl} = this.props;
    return (
      <amp-accordion>
        <section>
          <header className="comments-header">
            <span><i>Comments</i></span>
            <button className="comment-button">LEAVE A COMMENT</button>
          </header>
          <amp-facebook-comments width="486"
            height="657"
            layout="responsive"
            data-href={postUrl}>
          </amp-facebook-comments>
        </section>
      </amp-accordion>
    );
  }
}

export default Comments;