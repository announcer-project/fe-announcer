import React from "react"
import Layout from "../Layout/Layout";


import {
    useForm,
    Form,
    Input,
    ButtonSubmit,
} from "../../../common/Form";

export default function ConnectLinePage() {
    const [form] = useForm();
    const onFinish = (values) => {
        console.log("Success:", values);
    };
    return (
        <Layout>
            <div className="container pt-4">
                <h1>Connect Line Official Account</h1>
                <Form
                    form={form}
                    layout={"vertical"}
                    name="basic"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                >
                    <Input
                        label="Channel ID"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    />
                    <Input
                        label="Channel Access Token"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    />
                    <ButtonSubmit danger={true}>Back</ButtonSubmit>
                    <ButtonSubmit>test</ButtonSubmit>
                </Form>
            </div>
        </Layout>
    )
}