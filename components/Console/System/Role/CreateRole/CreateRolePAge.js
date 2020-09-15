import React from "react"
import Layout from "../../Layout/Layout";

import {
    useForm,
    Form,
    Input,
    ButtonSubmit,
} from "../../../../common/Form";


export default function CreateRolePage() {
    const [form] = useForm();
    const onFinish = (values) => {
        console.log("Success:", values);
    };
    return (
        <Layout>
            <div className="container pt-4">
                <h1>Create Role Page</h1>
            <Form
                    form={form}
                    layout={"vertical"}
                    name="basic"
                    onFinish={onFinish}
                >
                    <Input
                        name="rolename"
                        placeholder="Role name"
                        rules={[{ required: true, message: "Please input your role name!" }]}
                    />
                    <div className="d-flex justify-content-between">
                        <ButtonSubmit danger={true}>Back</ButtonSubmit>
                        <ButtonSubmit>Create role</ButtonSubmit>
                    </div>

                </Form>
            </div>
        </Layout>
    )
}