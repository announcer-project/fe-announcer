import React from "react"
import Layout from "../../Layout/Layout";
import { Table, Tag, Space } from 'antd';

export default function RoleRequestPage() {

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Role',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Approve',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Reject',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return (
        <Layout>
            <div className="container pt-4">
                <h1>Role Request</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        </Layout>
    )
}