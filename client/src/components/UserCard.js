import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const UserCard = props => {
  const [user, setUser] = useState({});

  const id = props.match.params.id;
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log("Error fetching user: ", err);
      });
  }, [id]);

  const deleteUser = id => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then(() => {
        props.history.push("/");
      })
      .catch(err => {
        console.log("Error deleting: ", err);
      });
  };

  return (
    <div>
      <p>{user.name}</p>
      <button
        onClick={() => {
          props.toggleEdit(user);
          console.log(user);
          props.history.push("/");
        }}
      >
        Edit
      </button>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>
  );
};

export default withRouter(UserCard);
