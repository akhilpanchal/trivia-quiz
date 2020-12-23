import React from "react";
import { Button, Form, Input, Space } from "antd";
import { setUserPref } from "../service/localStorage";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 7 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

function Login() {
    const [form] = Form.useForm();

    const history = useHistory();

    const onFinish = React.useCallback(() => {
        const values = form.getFieldsValue();
        setUserPref({values});
        history.push("/quiz");
    }, [form, history]);

    const onReset = React.useCallback(() => {
        form.resetFields();
    }, [form]);

    const handleSignupWithGoogle = React.useCallback(() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().useDeviceLanguage();

        firebase.auth().signInWithPopup(provider)
            .then((result: any) => {
                console.log("result:: ", result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                history.push("/dashboard");
            })
            .catch((error) => {
                console.log("error:: ", error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
          


    }, []);
    return (
        <Form {...layout} form={form} name="sign-up" onFinish={onFinish}>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" onClick={handleSignupWithGoogle}>
                        Sign Up with Google
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default Login;
