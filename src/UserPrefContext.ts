import React from "react";

type UserPref = {
    userName?: string;
};

const UserPrefContext = React.createContext<UserPref | null>(null);

export default UserPrefContext;