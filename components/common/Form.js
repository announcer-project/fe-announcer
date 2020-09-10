import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import {
  Form as FormAnt,
  Input as InputAnt,
  Checkbox as CheckboxAnt,
} from "antd";
import Button from "./Button";

const StyleForm = styled.div`
  .ant-checkbox-wrapper {
    color: black;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus .ant-checkbox-inner {
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.color.base};
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-form-item-label > label {
    color: black;
  }
  .ant-input {
    border-radius: 50px;
  }
  .ant-input:hover {
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-input:focus,
  .ant-input-focused {
    border-color: ${(props) => props.theme.color.base};
    box-shadow: 0 0 0 2px rgba(5, 0, 66, 0.2);
  }
  .ant-input-affix-wrapper {
    border-radius: 50px;
  }
  .ant-input-affix-wrapper:hover {
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: ${(props) => props.theme.color.base};
    box-shadow: 0 0 0 2px rgba(5, 0, 66, 0.2);
  }
  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error .ant-input:hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    border-color: ${(props) => props.theme.color.error};
  }
  .ant-form-item-has-error .ant-input:not([disabled]):hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:not([disabled]):hover {
    border-color: ${(props) => props.theme.color.error};
  }
  .ant-form-item-has-error .ant-form-item-explain,
  .ant-form-item-has-error .ant-form-item-split {
    padding-left: 10px;
    color: ${(props) => props.theme.color.error};
  }
  .ant-form-item-has-error .ant-form-item-explain,
  .ant-form-item-has-error .ant-form-item-split {
    color: ${(props) => props.theme.color.error};
  }
`;

export const Form = ({
  formItemLayout,
  layout,
  form,
  name,
  initialValues,
  onFinish,
  onFinishFailed,
  children,
}) => {
  return (
    <StyleForm>
      <FormAnt
        form={form}
        formItemLayout={formItemLayout}
        layout={layout}
        name={name}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {children}
      </FormAnt>
    </StyleForm>
  );
};

export const Input = ({ label, name, rules }) => {
  return (
    <FormAnt.Item label={label} name={name} rules={rules}>
      <InputAnt />
    </FormAnt.Item>
  );
};

export const InputPassword = ({ label, name, rules }) => {
  return (
    <FormAnt.Item label={label} name={name} rules={rules}>
      <InputAnt.Password />
    </FormAnt.Item>
  );
};

export const Checkbox = ({ name, valuePropName, children }) => {
  return (
    <FormAnt.Item name={name} valuePropName={valuePropName}>
      <CheckboxAnt>{children}</CheckboxAnt>
    </FormAnt.Item>
  );
};

export const ButtonSubmit = (props) => {
  return (
    <FormAnt.Item>
      <Button {...props} htmlType="submit">
        {props.children}
      </Button>
    </FormAnt.Item>
  );
};

const CKEditorDynamic = dynamic(() => import("./CKEditor"), {
  ssr: false,
});

const StyleCKEditor = styled.div`
  input {
    display: none;
  }
  .ck-editor__editable {
    height: ${(props) => props.height};
  }
  .ck.ck-list__item .ck-button.ck-on,
  .ck.ck-list__item .ck-button.ck-on:hover:not(.ck-disabled) {
    background-color: ${(props) => props.theme.color.base};
  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    outline: none;
    border: 1px solid ${(props) => props.theme.color.base};
  }
  .ck.ck-button.ck-on,
  a.ck.ck-button.ck-on,
  .ck.ck-button:not(.ck-disabled):active,
  a.ck.ck-button:not(.ck-disabled):active,
  .ck.ck-button:not(.ck-disabled):hover,
  a.ck.ck-button:not(.ck-disabled):hover,
  .ck.ck-button.ck-on:not(.ck-disabled):active,
  a.ck.ck-button.ck-on:not(.ck-disabled):active,
  .ck.ck-button.ck-on:not(.ck-disabled):hover,
  a.ck.ck-button.ck-on:not(.ck-disabled):hover {
    background: none;
  }
  .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    border-radius: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
  .ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
    border-radius: 20px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

export const TextEditor = ({
  label,
  name,
  body,
  onChangeBody,
  rules,
  height,
}) => {
  return (
    <FormAnt.Item label={label} name={name} rules={rules}>
      <StyleCKEditor height={height}>
        <CKEditorDynamic
          data={body}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "blockQuote",
              "link",
              "numberedList",
              "bulletedList",
              "|",
              "undo",
              "redo",
            ],
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChangeBody(data);
          }}
        />
        <InputAnt value={body} />
      </StyleCKEditor>
    </FormAnt.Item>
  );
};
