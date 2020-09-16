import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import {
  Form as FormAnt,
  Input as InputAnt,
  Checkbox as CheckboxAnt,
  Upload as UploadAnt,
  Modal as ModalAnt,
  DatePicker as DatePickerAnt,
  Switch as SwitchAnt,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Button from "./Button";

const StyleForm = styled.div`
  .ant-form-item {
    margin-bottom: 12px;
  }
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
  .ant-switch-checked {
    background-color: ${(props) => props.theme.color.base};
  }
`;

export const useForm = () => {
  return FormAnt.useForm();
};

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
    <FormAnt
      form={form}
      formItemLayout={formItemLayout}
      layout={layout}
      name={name}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <StyleForm>{children}</StyleForm>
    </FormAnt>
  );
};

export const Input = React.memo((props) => {
  return (
    <FormAnt.Item
      {...props}
      label={props.label}
      name={props.name}
      rules={props.rules}
    >
      <InputAnt {...props} />
    </FormAnt.Item>
  );
});

export const InputPassword = React.memo(
  ({ label, name, rules, value, setPassword }) => {
    return (
      <FormAnt.Item label={label} name={name} rules={rules}>
        <InputAnt.Password value={value} onChange={setPassword} />
      </FormAnt.Item>
    );
  }
);

export const Checkbox = React.memo((props) => {
  return (
    <FormAnt.Item
      name={props.name}
      valuePropName={props.valuePropName}
      {...props}
    >
      <CheckboxAnt {...props}>{props.children}</CheckboxAnt>
    </FormAnt.Item>
  );
});

export const Switch = React.memo((props) => {
  return (
    <FormAnt.Item {...props}>
      <SwitchAnt {...props}/>
    </FormAnt.Item>
  );
});

export const ButtonSubmit = React.memo((props) => {
  return (
    <FormAnt.Item>
      <Button {...props} htmlType="submit">
        {props.children}
      </Button>
    </FormAnt.Item>
  );
});

const CKEditorDynamic = dynamic(() => import("./CKEditor"), {
  ssr: false,
});

const StyleCKEditor = styled.div`
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

const StyleCheckRequire = styled.div`
  input {
    display: none;
  }
`;

export const TextEditor = React.memo(
  ({ form, label, name, defaultValue, rules, height }) => {
    const [body, setBody] = useState(defaultValue);

    useEffect(() => {
      form.setFieldsValue({
        [name]: body,
      });
    }, [body]);

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
              setBody(data);
            }}
          />
        </StyleCKEditor>
        <StyleCheckRequire>
          <InputAnt />
        </StyleCheckRequire>
      </FormAnt.Item>
    );
  }
);

const StyleUpload = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    margin-right: 0;
    margin-bottom: 0;
    border: 1px dashed ${(props) => props.theme.color.base};
    border-radius: 20px;
    width: 100%;
    height: ${(props) => props.height};
  }
  .ant-upload.ant-upload-select-picture-card:hover {
    border: 1px dashed ${(props) => props.theme.color.base_hover};
  }
  .ant-upload-picture-card-wrapper {
    display: unset;
  }
`;

const RemoveImageBtn = styled.button`
  background-color: ${(props) => props.theme.color.danger};
  border: none;
  color: white;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 8px 13px;
  border-radius: 20px;
  &:hover {
    background-color: ${(props) => props.theme.color.danger_hover};
  }
  .anticon {
    vertical-align: 0em;
  }
`;

export const UploadImage = React.memo(
  ({ form, label, name, defaultValue, rules, height, children }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(defaultValue);

    useEffect(() => {
      form.setFieldsValue({
        [name]: image,
      });
    }, [image]);

    const handleChangeCover = (info) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        getBase64Cover(info.file.originFileObj, (imageUrl) => {
          setImage(imageUrl);
          setLoading(false);
        });
      }
    };

    function getBase64Cover(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    function beforeUploadCover(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    }

    function onRemoveCover() {
      setImage("");
    }

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">{children}</div>
      </div>
    );
    return (
      <FormAnt.Item label={label} name={name} rules={rules}>
        <div>
          {image !== "" ? (
            ""
          ) : (
            <StyleUpload height={height}>
              <UploadAnt
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUploadCover}
                onChange={handleChangeCover}
              >
                {uploadButton}
              </UploadAnt>
            </StyleUpload>
          )}
          {image !== "" ? (
            <div style={{ position: "relative" }}>
              <img
                className="imgUploaded border"
                src={image}
                alt="avatar"
                style={{
                  width: "100%",
                  height: height,
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <RemoveImageBtn
                className="shadow"
                onClick={() => onRemoveCover()}
              >
                <CloseOutlined />
              </RemoveImageBtn>
            </div>
          ) : (
            ""
          )}
        </div>
        <StyleCheckRequire>
          <InputAnt />
        </StyleCheckRequire>
      </FormAnt.Item>
    );
  }
);

const StyleFormUploadImages = styled.div`
  .ant-row {
    flex-flow: unset;
  }
  .ant-upload.ant-upload-select-picture-card {
    margin-right: 0;
    margin-bottom: 0;
    border: 1px dashed ${(props) => props.theme.color.base};
    border-radius: 20px;
    /* width: 100%;
    height: ${(props) => props.height}; */
  }
  .ant-upload.ant-upload-select-picture-card:hover {
    border: 1px dashed ${(props) => props.theme.color.base_hover};
  }
`;

export const UploadImages = React.memo(
  ({ form, label, name, defaultValue, rules, height, children }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [images, setImages] = useState(defaultValue);

    useEffect(() => {
      form.setFieldsValue({
        [name]: images,
      });
    }, [images]);

    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    };

    const handleChange = ({ fileList }) => {
      setImages(fileList);
    };

    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

    return (
      <StyleFormUploadImages>
        <FormAnt.Item label={label} name={name} rules={rules}>
          <UploadAnt
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={images}
            multiple
            onPreview={handlePreview}
            onChange={handleChange}
          >
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">{children}</div>
            </div>
          </UploadAnt>
          <ModalAnt
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </ModalAnt>
        </FormAnt.Item>
      </StyleFormUploadImages>
    );
  }
);

const Item = styled.div`
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? props.theme.color.base : "white"};
  color: ${(props) => (props.selected ? "white" : "rgb(0,0,0,0.65)")};
`;

export const Selected = React.memo(
  ({ form, label, name, defaultValue, rules }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      setItems(defaultValue);
    }, []);
    useEffect(() => {
      form.setFieldsValue({
        [name]: items.filter((item) => item.selected),
      });
    }, [items]);

    const onSelectItem = async (key) => {
      items[key].selected = !items[key].selected;
      setItems([...items]);
    };

    return (
      <FormAnt.Item label={label} name={name} rules={rules}>
        <div>
          {items.map((item, key) => {
            return (
              <Item
                key={key}
                onClick={() => onSelectItem(key)}
                selected={item.selected}
                className="border shadow-sm d-inline-block py-2 px-4 mr-2 mt-2"
              >
                {item.name}
              </Item>
            );
          })}
        </div>
        <StyleCheckRequire>
          <InputAnt />
        </StyleCheckRequire>
      </FormAnt.Item>
    );
  }
);

export const DatePicker = React.memo(({ form, label, name, defaultValue }) => {
  useEffect(() => {
    form.setFieldsValue({
      [name]: defaultValue,
    });
  }, []);
  return (
    <FormAnt.Item name={name} label={label}>
      <DatePickerAnt defaultValue={defaultValue} />
    </FormAnt.Item>
  );
});
