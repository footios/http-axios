import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      const posts = response.data.slice(0, 4);
      const udatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Max"
        };
      });
      this.setState({ posts: udatedPosts });
    });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const posts = this.state.posts.map(post => (
      <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={() => this.postSelectedHandler(post.id)}
      />
    ));
    let fullPost = <FullPost />;
    if (this.state.selectedPostId) {
      fullPost = this.state.posts.find(post => {
        if (post.id === this.state.selectedPostId) {
          fullPost = (
            <FullPost id={post.id} title={post.title} content={post.body} />
          );
        }
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>{fullPost}</section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
