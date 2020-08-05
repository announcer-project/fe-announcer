import React, { useState, useContext } from 'react';
import { Form, Input } from 'antd';
import CreatesystemButton from './CreatesystemButton';
import styled from 'styled-components';
import { CreatesystemContext } from "../../../store/CreatesystemProvider";

const ButtonAddNewsType = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 50px;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  width: 77px;
  margin-top: 10px;
`;



function Step1() {
    const [form] = Form.useForm();
    const [newstypeInput, setNewstypeInput] = useState("");
    const { newstype, changeNewstype } = useContext(CreatesystemContext);
    const [formLayout, setFormLayout] = useState('vertical');

    const addNewstype = () => {
        let newnewstype = newstype
        newnewstype.push(newstypeInput)
        changeNewstype(newnewstype)
        setNewstypeInput("")
    }

    const deleteNewstype = (newstypename) => {
        let newnewstype = newstype
        newnewstype = newnewstype.filter((newstype) => {
            return newstype !== newstypename
        })
        changeNewstype(newnewstype)
    }

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const formItemLayout = null;
    const buttonItemLayout = null;
    return (
        <div>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item
                    label="System name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <div className="row">
                    <div className="col-10">
                        <Form.Item
                            label="News type"
                        >
                            <Input className="col-10" value={newstypeInput} onChange={(e) => setNewstypeInput(e.target.value)} placeholder="input placeholder" />
                        </Form.Item>
                    </div>
                    <div className="col-2 pt-3">
                        <ButtonAddNewsType className="col-2" onClick={() => addNewstype()}>
                            Add
                        </ButtonAddNewsType>
                    </div>
                </div>

                {newstype.map((newstype) => {
                    return (
                        <div>
                            {newstype}<button onClick={() => deleteNewstype(newstype)}>X</button>
                        </div>
                    )
                })}
                {/* <Form.Item {...buttonItemLayout}>
                    <Button type="primary">Submit</Button>
                </Form.Item> */}
                <CreatesystemButton>
                    Next
                </CreatesystemButton>
            </Form>
        </div>
    )
}

export default Step1;