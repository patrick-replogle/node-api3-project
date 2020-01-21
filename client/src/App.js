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

  toggleEdit = user => {
    this.setState({
      isEditing: true,
      itemToEdit: user
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
