import React from "react";
import axios from "axios";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      posts: []
    };
  }

  fetchUser = id => {
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log("Error fetching user: ", err);
      });
  };

  fetchPosts = id => {
    axios
      .get(`http://localhost:4000/api/users/${id}/posts`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log("Error fetching posts: ", err);
      });
  };

  deleteUser = id => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error deleting: ", err);
      });
  };

  componentDidMount() {
    this.fetchUser(this.props.match.params.id);
    this.fetchPosts(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchUser(this.props.match.params.id);
      this.fetchPosts(this.props.match.params.id);
    }
  }
  render() {
    return (
      <div>
        <p>Username: {this.state.user.name}</p>
        {this.state.posts
          ? this.state.posts.map(post => {
              return <p key={post.id}>{post.text}</p>;
            })
          : ""}
        <button
          onClick={() => {
            this.props.toggleEdit(this.state.user);
            this.props.history.push("/");
          }}
        >
          Edit
        </button>
        <button onClick={() => this.deleteUser(this.state.user.id)}>
          Delete
        </button>
      </div>
    );
  }
}

export default UserCard;
