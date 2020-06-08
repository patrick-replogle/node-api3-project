import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import UserCard from "./components/UserCard";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      itemToEdit: {}
    };
  }

  toggleEdit = item => {
    this.setState({
      isEditing: true,
      itemToEdit: item
    });
  };

  cancelEdit = () => {
    this.setState({
      isEditing: false,
      itemToEdit: {}
    });
  };
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => {
            return (
              <MainPage
                {...props}
                isEditing={this.state.isEditing}
                itemToEdit={this.state.itemToEdit}
                cancelEdit={this.cancelEdit}
              />
            );
          }}
        />
        <Route
          path="/user/:id"
          render={props => {
            return (
              <UserCard
                {...props}
                isEditing={this.state.isEditing}
                itemToEdit={this.state.itemToEdit}
                toggleEdit={this.toggleEdit}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
