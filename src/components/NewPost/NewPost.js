import React, { Component } from "react";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    author: ""
  };

  componentDidMount = () => {
    this.setState({ author: "Max" });
  };

  render() {
    console.log(this.state);

    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          type="text"
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ body: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button
          onClick={() =>
            this.props.added(
              this.state.title,
              this.state.body,
              this.state.author
            )
          }
        >
          Add Post
        </button>
      </div>
    );
  }
}

export default NewPost;
