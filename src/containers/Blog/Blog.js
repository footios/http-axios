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

  postSelectedHandler(id) {
    this.setState({ selectedPostId: id });
  }

  postAdded = (title, body, author, id) => {
    this.setState(PrevState => {
      const posts = [...PrevState.posts];
      const NewPost = { title, body, author };
      posts.push(NewPost);
      return {
        posts: posts
      };
    });
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
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost added={this.postAdded} />
        </section>
      </div>
    );
  }
}

export default Blog;
