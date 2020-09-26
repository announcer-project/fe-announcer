import React from "react";
import { Table } from "antd";
import Button from "../../../common/Button";

export default function SettingAdminPage(props) {

    const columns = [
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (text, record) => (
                <Button onClick={() => console.log(record.key)}>
                    Edit
                </Button>
            ),
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <Button danger={true} onClick={() => console.log(record.key)}>
                    Delete
                </Button>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            userId: "John Brown",
            name: 32,
            position: "New York No. 1 Lake Park",
            n: "New York No. 1 Lake Park",
        },
        {
            key: "2",
            userId: "Jim Green",
            name: 42,
            position: "London No. 1 Lake Park",
        },
        {
            key: "3",
            userId: "Joe Black",
            name: 32,
            position: "Sidney No. 1 Lake Park",
        },
    ];

    return (
        <div className="container pt-4">
            <h1>Setting admin</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}