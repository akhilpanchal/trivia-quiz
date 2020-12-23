import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import firebase from "firebase";
import React from "react";

const Signout = () => {
    const handleSignout = React.useCallback(() => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("Sign-out successful");
        }).catch((error) => {
            console.log("Sign-out failed", error);
          });
          
    }, []);

    return (
        <span style={{position: "fixed", right: "30px"}}>
            <Button>
                Sign Out <PoweroffOutlined onClick={handleSignout} />
            </Button>
        </span>
    );
};

export default Signout;