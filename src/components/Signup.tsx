import React from "react";
import { Button, Form, Input, Space } from "antd";
import { setUserPref } from "../service/localStorage";
import { useHistory } from "react-router-dom";

const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 7 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

function Signup() {
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

    return (
        <Form {...layout} form={form} name="sign-up" onFinish={onFinish}>
            <h1>Welcome to Trivia Qwiz</h1>
            <Form.Item name="userName" label="User Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Sign Up!
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default Signup;
