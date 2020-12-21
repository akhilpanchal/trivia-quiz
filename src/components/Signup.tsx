import React from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { setUserPref } from "../service/localStorage";

const { Option } = Select;

const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 7 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

function Signup() {
    const [form] = Form.useForm();

    console.log("form=", form);

    const onFinish = React.useCallback(() => {
        const values = form.getFieldsValue();
        setUserPref(values);
    }, []);

    const onDifficultyChange = React.useCallback(() => {
        console.log("onDifficultyChange");
    }, []);

    const onReset = React.useCallback(() => {
        console.log("onReset");
    }, []);

    const onFill = React.useCallback(() => {
        console.log("onFill");
    }, []);

    return (
        <Form {...layout} form={form} name="sign-up" onFinish={onFinish}>
            <h1>Welcome to Trivia Qwiz</h1>
            <Form.Item name="userName" label="User Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="difficulty" label="Difficulty" rules={[{ required: true }]}>
                <Select
                    placeholder="Select difficulty level"
                    onChange={onDifficultyChange}
                    allowClear>
                    <Option value="Easy">Easy</Option>
                    <Option value="Moderate">Moderate</Option>
                    <Option value="Difficult">Difficult</Option>
                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.difficulty !== currentValues.difficulty
                }>
                {({ getFieldValue }) => {
                    return getFieldValue("difficulty") === "other" ? (
                        <Form.Item
                            name="customizeDifficulty"
                            label="Customize Difficulty"
                            rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null;
                }}
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
