import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
} from "reactstrap";

import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { uploadfile } from "../../../actions/complaint/formAction";

const ComplaintFormPage = (props) => {
  const user = useSelector((state) => state.complaint.auth.user);
  const token = useSelector((state) => state.complaint.auth.token);

  const [email, setemail] = useState(user.email);
  const [phone, setphone] = useState("");
  const [type, settype] = useState("");
  const [topic, settopic] = useState("");
  const [detail, setdetail] = useState("");
  const [member, setmember] = useState("MEMBER");

  // Upload_File
  const [LabelFile, setLabelFile] = useState("Choose File");
  const [CheckFile, setCheckFile] = useState(false);
  const [CheckFileCorrect, setCheckFileCorrect] = useState(false);
  const [CheckNoFile, setCheckNoFile] = useState(true);
  const [mergeName, setMergeName] = useState("");
  const [filePath, setfilePath] = useState("");
  const [Image, setImage] = useState({
    preview: "",
    raw: "",
  });

  ComplaintFormPage.propTypes = {
    uploadfile: PropTypes.array,
  };

  const { uploadfile } = props;

  const onChange = async (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setemail(value);
    }
    if (name === "member") {
      setmember(value);
    }

    if (name === "fileupload") {
      if (e.target.files.length) {
        setCheckFile(true);
        setCheckNoFile(false);
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        });
      } else {
        setImage({
          preview: "",
          raw: "",
        });
        setCheckFile(false);
        setMergeName("");
        setfilePath("");
        setCheckFileCorrect(false);
        setCheckNoFile(true);
      }
    }
  };

  // mergeName
  useEffect(() => {
    const timenow = Date.now();
    const setImageName = async () => {
      if ((await Image.raw.type) === "image/png") {
        await setMergeName(timenow + ".png");
        await setCheckFileCorrect(true);
      } else if ((await Image.raw.type) === "image/jpeg") {
        await setMergeName(timenow + ".jpg");
        await setCheckFileCorrect(true);
      } else if ((await Image.raw.type) === "image/gif") {
        await setMergeName(timenow + ".gif");
        await setCheckFileCorrect(true);
      } else {
        await setCheckFileCorrect(false);
      }
    };
    setImageName();
  }, [Image]);

  // create name upload
  useEffect(() => {
    const setImagePath = async () => {
      if (await mergeName) {
        await setfilePath("/uploads/" + user.buasri_id + "/" + mergeName);
      }
    };
    setImagePath();
    // eslint-disable-next-line
  }, [mergeName]);

  // ล้างรูป Upload
  const cancelUpload = (e) => {
    e.preventDefault();
    setImage({
      preview: "",
      raw: "",
    });
    setCheckFile(false);
    setMergeName("");
    setfilePath("");
    setCheckFileCorrect(false);
    setCheckNoFile(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    async function upload() {
      if (CheckFile) {
        if (Image) {
          if (
            Image.raw.type === "image/png" ||
            Image.raw.type === "image/jpeg" ||
            Image.raw.type === "image/gif"
          ) {
            const NewUploadFile = new FormData();
            await NewUploadFile.append("file", Image.raw, mergeName);
            await NewUploadFile.append("buasri_id", user.buasri_id);
            await NewUploadFile.append("filePath", filePath);
            await uploadfile(NewUploadFile, token);
          } else {
            await alert("ประเภทไฟล์ของคุณไม่ถูกต้อง");
          }
        }
      }
    }

    const newList = await {
      buasri_id: user.buasri_id,
      member: member,
    };

    await upload();
  };

  return (
    <Fragment>
      <Container>
        <h4>
          <b>แบบฟอร์มการร้องเรียน</b>
        </h4>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <p className="text-danger">
              แบบฟอร์มนี้มีไว้สำหรับการรับข้อร้องเรียนต่างๆ
              โดยข้อมูลต่างๆที่ท่านกรอกผ่านแบบฟอร์มนี้ จะถูกเก็บเป็นความลับ ชื่อ
              เบอร์โทรศัพท์ และอีเมล์ ของท่านมีไว้เพื่อติดต่อกลับ
              ทางคณะผู้บริหารจะนำข้อร้องเรียนและข้อเสนอแนะไปปรับปรุงการให้บริการของคณะวิทยาศาสตร์ต่อไป
              ขอขอบพระคุณสำหรับความร่วมมือ{" "}
            </p>
            <p>
              **หมายเหตุ:
              ท่านจำเป็นต้องกรอกข้อมูลทุกข้อให้ครับถ้วนจึงถือเป็นข้อร้องเรียน
            </p>
          </FormGroup>
          {user.position === "ADMIN" ? (
            <FormGroup>
              <Label for="email">*Email:</Label>
              <Input
                type="email"
                name="email"
                onChange={onChange}
                placeholder="E-mail ผู้แจ้ง"
              ></Input>
            </FormGroup>
          ) : (
            <FormGroup>
              <Label for="email">*Email:</Label>
              <Input
                type="email"
                name="email"
                onChange={onChange}
                placeholder={user.email}
                value={user.email}
                readOnly
              ></Input>
            </FormGroup>
          )}

          <FormGroup>
            <Label for="info">*รายละเอียด:</Label>
            <Input
              type="textarea"
              name="info"
              onChange={onChange}
              placeholder="อธิบายรายละเอียดที่ต้องการร้องเรียน"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="uploadfile">
              Upload File: (เฉพาะไฟล์รูปภาพ PNG, JPG และ GIF เท่านั้น)
            </Label>
            <CustomInput
              type="file"
              name="fileupload"
              label={LabelFile}
              onChange={onChange}
              accept="image/PNG, image/JPEG, image/GIF"
            />
            {Image.preview ? (
              <Fragment>
                <br />
                <br />
                <Button color={"danger"} onClick={cancelUpload}>
                  ยกเลิก Upload
                </Button>
                <img src={Image.preview} alt="" width="300" />
              </Fragment>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Button color="dark">Submit</Button>
          </FormGroup>
        </Form>
      </Container>
    </Fragment>
  );
};

export default withRouter(connect(null, { uploadfile })(ComplaintFormPage));
