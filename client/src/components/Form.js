import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name !== "") {
      if (this.props.isEditing) {
        this.props.updateUser(this.props.itemToEdit.id, this.state);
        this.setState({
          name: ""
        });
      } else {
        this.props.addUser(this.state);
        this.setState({
          name: ""
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.itemToEdit !== this.props.itemToEdit &&
      this.props.isEditing === true
    ) {
      this.setState({
        name: this.props.itemToEdit.name
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.isEditing ? <h2>Edit a User</h2> : <h2>Add a User</h2>}
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.name}
            type=""
            onChange={this.handleChange}
            placeholder="name"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;