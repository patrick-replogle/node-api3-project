import React from "react";
import UserLink from "./UserLink";

const Users = props => {
  return (
    <div>
      {props.users.map(user => {
        return <UserLink user={user} key={user.id} />;
      })}
    </div>
  );
};

export default Users;
