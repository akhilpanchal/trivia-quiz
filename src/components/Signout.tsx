import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import firebase from "firebase";
import React from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "../CurrentUserContext";

const Signout = () => {
    const currentUser = React.useContext(CurrentUserContext);

    const history = useHistory();

    const handleSignout = React.useCallback(() => {
        firebase.auth().signOut()
            .then(() => {
                history.push("");
            })
            .catch(error => {
                console.error(error);
            });
    }, [history]);

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