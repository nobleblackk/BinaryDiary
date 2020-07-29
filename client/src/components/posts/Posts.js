import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import PostForm from "./PostForm";

import PostFeed from "./PostFeed";

import Spinner from "../common/Spinner";

import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  // We want to call getPosts as soon as our component mounts, so we will call getPosts in componentDidMount
  componentDidMount() {
    // This Action will fetch all the posts and then we will render them on Screen :)
    this.props.getPosts();
  }
  render() {
    // Here we are destructuring the content so that, we can further determine whether we need to show posts (if we have) or not show(if we don't have any already). This will be stored in variable named, postContent :)
    const { posts, loading } = this.props.post;

    let postContent;

    // Checking whether post is null or not
    if (posts === null || loading) {
      // Empty Posts, so we will post our Spinner here
      postContent = <Spinner></Spinner>;
    } else {
      // Now we know, there are at least some posts, so we will render
      postContent = <PostFeed posts={posts}></PostFeed>;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm></PostForm>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
