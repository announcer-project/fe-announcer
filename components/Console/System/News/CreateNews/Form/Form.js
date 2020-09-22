import React, { useContext, useState, useEffect, useMemo } from "react";
import Button from "../../../../../common/Button";
import { EyeOutlined } from "@ant-design/icons";
import { CreateNewsContext } from "../../../../../../store/CreateNewsProvider";
import {
  useForm,
  Form,
  Input,
  UploadImage,
  TextEditor,
  DatePicker,
  UploadImages,
  Selected,
  ButtonSubmit,
} from "../../../../../common/Form";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FromCreateNews(props) {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const {
    title,
    body,
    cover,
    expiredateStatus,
    expiredate,
    fileImage,
    newsTypes,
  } = useContext(CreateNewsContext);

  const {
    changeTitle,
    changeBody,
    changeCover,
    changeStatusExpiredate,
    changeExpiredate,
    changeFileImage,
    selectNewsType,
    setPostdate,
    changeStep,
  } = useContext(CreateNewsContext);

  const [form] = useForm();
  form.setFieldsValue({
    cover: cover,
    title: title,
    body: body,
    expiredate: expiredate,
    images: fileImage,
    newstypes: newsTypes,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    selectNewsType(props.newsTypes);
    const today = new Date();
    setPostdate(today);
    scrollToTop();
  }, []);

  const SetNewsTypes = async (newstypes) => {
    let newnewstypes = newsTypes;
    newstypes.forEach((vn) => {
      newnewstypes.forEach((n) => {
        if (n.id === vn.id) {
          n.selected = true;
        }
      });
    });
    return newnewstypes;
  };

  const onPreview = async (values) => {
    changeCover(values.cover);
    changeTitle(values.title);
    changeBody(values.body);
    changeExpiredate(values.expire_date);
    changeFileImage(values.images);
    let newnewstypes = await SetNewsTypes(values.newstypes);
    selectNewsType(newnewstypes);
    changeStep(2);
  };
  return (
    <div>
      <Form form={form} layout={"vertical"} onFinish={onPreview}>
        <UploadImage
          label="Cover"
          form={form}
          height="300px"
          name="cover"
          defaultValue={cover}
        >
          Upload cover
        </UploadImage>
        <Input
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        />
        <TextEditor
          label="Body"
          form={form}
          height="300px"
          name="body"
          defaultValue={body}
          rules={[{ required: true, message: "Please enter body" }]}
        />
        <DatePicker
          form={form}
          label="Expiredate"
          name="expire_date"
          defaultValue={expiredate}
        />
        <UploadImages
          form={form}
          label="Upload images"
          name="images"
          defaultValue={fileImage}
        >
          Upload images
        </UploadImages>
        <Selected
          form={form}
          label="Select news type"
          name="newstypes"
          defaultValue={newsTypes.length === 0 ? props.newsTypes : newsTypes}
          rules={[
            {
              required: true,
              message: "Please select news type at lease 1 type",
            },
          ]}
        />
        <div className="mt-5">
          <div className="d-flex justify-content-between">
            <Link href={`/console/${systemname}/${systemid}/news/allnews`}>
              <Button danger={true}>Back</Button>
            </Link>
            <ButtonSubmit>
              <EyeOutlined /> Preview
            </ButtonSubmit>
          </div>
        </div>
      </Form>
    </div>
  );
}
