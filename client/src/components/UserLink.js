import React from "react";
import { Link } from "react-router-dom";

const UserLink = props => {
  return (
    <div>
      <Link to={`/user/${props.user.id}`}>
        <p>{props.user.name}</p>
      </Link>
    </div>
  );
};

export default UserLink;
