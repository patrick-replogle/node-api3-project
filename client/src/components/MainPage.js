import React from "react";
import Users from "./Users";
import Form from "./Form";
import axios from "axios";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  fetchData = () => {
    axios
      .get("http://localhost:4000/api/users")
      .then(res => {
        this.setState({
          users: res.data.reverse()
        });
      })
      .catch(err => {
        console.log("Error fetching : ", err);
      });
  };

  addUser = user => {
    axios
      .post("http://localhost:4000/api/users", user)
      .then(() => {
        this.fetchData();
      })
      .catch(err => {
        console.log("Error adding user: ", err);
      });
  };

  updateUser = (id, user) => {
    axios
      .put(`http://localhost:4000/api/users/${id}`, user)
      .then(() => {
        this.fetchData();
      })
      .catch(err => {
        console.log("Error updating user: ", err);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h2>App Users Displayed Below</h2>
        <Form
          users={this.state.users}
          isEditing={this.props.isEditing}
          itemToEdit={this.props.itemToEdit}
          fetchData={this.fetchData}
          addUser={this.addUser}
          updateUser={this.updateUser}
          cancelEdit={this.props.cancelEdit}
        />
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default MainPage;
