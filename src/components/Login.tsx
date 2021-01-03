import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Button, Form, Space } from "antd";

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
        history.push("/quiz");
    }, [history]);

    const handleSignupWithGoogle = React.useCallback(() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().useDeviceLanguage();

        firebase.auth().signInWithPopup(provider)
            .then((result: any) => {
                history.push("/dashboard");
            })
            .catch((error) => {
                console.error("error:: ", error);
            });
    }, [history]);

    return (
        <Form {...layout} form={form} name="sign-in" onFinish={onFinish}>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" onClick={handleSignupWithGoogle}>
                        Sign In with Google
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default Login;
