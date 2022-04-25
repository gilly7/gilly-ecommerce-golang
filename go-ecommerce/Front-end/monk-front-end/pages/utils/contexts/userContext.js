import React from "react";
import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(["Monk"]);

  const [editInfo, setEditInfo] = useState("This is");

  const [determine, setDetermine] = useState("Add");

  return (
    <userContext.Provider
      value={{
        userDetails: { user, setUser },
        edit: { editInfo, setEditInfo },
        determinor: { determine, setDetermine },
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};
