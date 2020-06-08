import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    if (this.props.isEditing && this.props.itemToEdit !== {}) {
      this.setState({
        name: this.props.itemToEdit.name
      });
    }
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
        this.props.cancelEdit();
      } else {
        this.props.addUser(this.state);
        this.setState({
          name: ""
        });
      }
    }
  };

  render() {
    return (
      <div>
        {this.props.isEditing ? <h2>Edit a User</h2> : <h2>Add a User</h2>}
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.name}
            type="text"
            name="name"
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
