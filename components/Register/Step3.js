// import { Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { RegisterContext } from "../../store/RegisterProvider";
import React, { useContext } from "react";
import Link from "next/link"
import RegisterButton from './RegisterButton'



function Step3() {

    const { email, step, firstname, lastname } = useContext(RegisterContext);
    console.log("step", step)

    return (
        <div className="text-center">
            <p>Name: {firstname} {lastname}</p>
            <p>E-mail: {email}</p>
            <Link href="/console/systems">
                <div className="col-6 mx-auto">
                    <RegisterButton type="submit">
                        Submit
                    </RegisterButton>
                </div>
            </Link>
        </div>
    )
}

export default Step3

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

// class Avatar extends React.Component {
//   state = {
//     loading: false,
//   };

//   handleChange = info => {
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, imageUrl =>
//         this.setState({
//           imageUrl,
//           loading: false,
//         }),
//       );
//     }
//   };

//   render() {
//     const uploadButton = (
//       <div>
//         {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     const { imageUrl } = this.state;
//     return (
//       <Upload
//         name="avatar"
//         listType="picture-card"
//         className="avatar-uploader"
//         showUploadList={false}
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         beforeUpload={beforeUpload}
//         onChange={this.handleChange}
//       >
//         {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//       </Upload>
//     );
//   }
// }

// ReactDOM.render(<Avatar />, mountNode);