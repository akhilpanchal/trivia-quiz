import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import firebase from "firebase";
import React from "react";
import CurrentUserContext from "../CurrentUserContext";

const Signout = () => {
    const currentUser = React.useContext(CurrentUserContext);

    const handleSignout = React.useCallback(() => {
        console.log("signing out")
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("Sign-out successful");
        }).catch((error) => {
            console.log("Sign-out failed", error);
          });
          
    }, []);

    if (!currentUser) {
        return null;
    }

    return (
        <span style={{position: "fixed", right: "30px"}}>
            <Button onClick={handleSignout}>
                Sign Out <PoweroffOutlined />
            </Button>
        </span>
    );
};

export default Signout;