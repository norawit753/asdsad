import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Container,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { uploadfile } from "../../../actions/research/formAction";
import PropTypes from "prop-types";
import typeartical from "../../../utilis/research/typearticle.json";
import typelevel from "../../../utilis/research/typelevel.json";
import EditTags from "../../research/TagsEdit";

// Env
import NewLineToBr from "../../../utilis/newLine";
import { config } from "../../../utilis/config";

const ResearchEditPage = (props) => {
  const token = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);
  const fullyear = new Date().getFullYear();
  // Form
  const { register, handleSubmit } = useForm();

  // level0
  // value เปลี่ยนเมื่อ level เปลี่ยน
  const [levelChange, setlevelChange] = useState("");
  // trigger เมื่อ level เปลี่ยน
  const [levelStart, setlevelStart] = useState(true);
  // ใช้ trigger เมื่อเปลี่ยน level sub 2 สำเร็จ
  const [levelStart2, setlevelStart2] = useState(true);

  // config
  const conResearch = config.connectResearchAPI;

  // Upload File
  // เก่า
  const [OldUpload, setOldUpload] = useState(null);
  const [OldUploadName, setOldUploadName] = useState(null);
  const [OldUploadPath, setOldUploadPath] = useState(null);
  // ใหม่
  const [LabelFile, setLabelFile] = useState("Choose File");
  const [CheckFile, setCheckFile] = useState(false);
  const [CheckFileCorrect, setCheckFileCorrect] = useState(false);
  const [mergeName, setMergeName] = useState(null);
  const [filePath, setfilePath] = useState(null);
  const [PDF, setPDF] = useState({
    preview: "",
    raw: "",
  });

  // ประเภทงานวิจัย
  const [Level2, setLevel2] = useState([
    {
      sublevel_2_Key: "",
      sublevel_2: "---โปรดเลือก---",
    },
  ]);

  // propTypes
  ResearchEditPage.propTypes = {
    uploadfile: PropTypes.func.isRequired,
  };

  const { uploadfile } = props;

  // หากมีข้อมูล ให้ใส่ข้อมูลลง redux
  useEffect(() => {
    if (detail) {
      if (levelStart) {
        setlevelStart(false);
        setlevelStart2(true);
        setlevelChange(detail[0].level);
      }
      if (detail[0].file_name) {
        setOldUpload(conResearch + detail[0].file_path);
        setOldUploadName(detail[0].file_name);
        setOldUploadPath(detail[0].file_path);
      }
    }
  }, [detail]);

  // หาก level มีการเปลี่ยนแปลง ให้เปลี่ยน dropdown เป็น level ที่เลือก
  useEffect(() => {
    if (levelChange) {
      if (levelChange === "INTERNATIONAL") {
        setLevel2([
          { sublevel_2_Key: "WEB-OF-SCIENCE", sublevel_2: "lsi" },
          { sublevel_2_Key: "SCOPUS", sublevel_2: "Scopus" },
        ]);
        setlevelStart2(false);
      } else if (levelChange === "COUNTRY") {
        setLevel2([
          { sublevel_2_Key: "TCI-TYPE-1", sublevel_2: "TCI-TYPE-1" },
          { sublevel_2_Key: "TCI-TYPE-2", sublevel_2: "TCI-TYPE-2" },
        ]);
        setlevelStart2(false);
      } else {
        setLevel2([
          {
            sublevel_2_Key: "",
            sublevel_2: "---------",
          },
        ]);
        setlevelStart2(false);
      }
    }
  }, [levelChange]);

  // หากไม่มีข้อมูลให้กลับไปหน้าก่อน
  useEffect(() => {
    const fetchData = async () => {
      if (!detail) {
        props.history.push("/research");
      }
      if (detail && user) {
        if (
          detail[0].buasri_id !== user.buasri_id &&
          detail[0].status !== "EDIT"
        ) {
          props.history.push("/research");
        }
      }
    };
    fetchData();
  }, [detail]);
  /////////////////////////////////////Start Upload Zone ////////////////////////////////////////

  // หากมี PDF เก่าให้แสดง
  useEffect(() => {
    if (OldUpload) {
    }
  }, [OldUpload]);

  // Button Open Old PDF
  const toggleOldPDF = () => {
    window.open(OldUpload);
  };

  // MergeName
  useEffect(() => {
    const timenow = Date.now();
    const setPDFName = async () => {
      if ((await PDF.raw.type) === "application/pdf") {
        await setMergeName(timenow + ".pdf");
        await setCheckFileCorrect(true);
      } else {
        await setCheckFileCorrect(false);
      }
    };
    setPDFName();
    // eslint-disable-next-line
  }, [PDF]);

  // create name upload
  useEffect(() => {
    const setPDFPath = async () => {
      if (await mergeName) {
        await setfilePath("/uploads/" + user.buasri_id + "/" + mergeName);
      }
    };
    setPDFPath();
    // eslint-disable-next-line
  }, [mergeName]);

  /////////////////////////////////////End Upload Zone ////////////////////////////////////////

  // หากมีการเปลี่ยนแปลงการ form
  const onChange = (e) => {
    const { name, value } = e.target;
    // level
    if (name === "level") {
      setlevelChange(value);
      console.log(value);
    }
    // fileupload
    if (name === "fileupload") {
      if (e.target.files.length) {
        setCheckFile(true);
        setPDF({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        });
      } else {
        setPDF({
          preview: "",
          raw: "",
        });
      }
    }
  };

  // ส่งข้อมูลใหม่จากฟอร์ม
  const onSubmit = async (e) => {
    await console.log("ข้อมูลจากฟอร์ม " + e);
    await console.log("PDF เก่า " + OldUpload);
    await console.log("PDF ใหม่ " + mergeName);

    async function upload_newpdf() {
      if (CheckFile) {
        if (PDF) {
          if (PDF.raw.type === "application/pdf") {
            const NewUploadFile = new FormData();
            await NewUploadFile.append("file", PDF.raw, mergeName);
            await NewUploadFile.append("buasri_id", user.buasri_id);
            await NewUploadFile.append("filePath", filePath);

            // await console.log(...NewUploadFile);
            // // ส่งไฟล์ Upload
            await uploadfile(NewUploadFile, token);
          } else {
            await alert("ประเภทไฟล์ของคุณไม่ถูกต้อง");
          }
        }
      }
    }

    const newList = await {
      token,
      file_name:
        mergeName && filePath
          ? mergeName
          : OldUploadName
          ? OldUploadName
          : undefined,
      file_path:
        mergeName && filePath
          ? filePath
          : OldUploadPath
          ? OldUploadPath
          : undefined,
    };

    // await upload_newpdf();
    console.log(newList);
  };

  return (
    <Fragment>
      {detail ? (
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="research_name">ชื่องานวิจัย:</Label>
              <Input
                name="research_name"
                innerRef={register}
                defaultValue={detail[0].research_name}
              ></Input>
            </FormGroup>
            {/* ต้องแก้ */}
            <FormGroup>
              <Label for="article_type">ประเภทงานวิจัย:</Label>
              <Input
                type="select"
                name="article_type"
                defaultValue={detail[0].article_type}
                innerRef={register}
              >
                {typeartical.map((opt) => (
                  <option value={opt.articleKEY} key={opt.articleKEY}>
                    {opt.article}
                  </option>
                ))}
              </Input>
            </FormGroup>
            {/* ต้องแก้ */}
            <FormGroup>
              <Label for="article_type">ปีที่ Pubilc:</Label>
              <Input
                type="select"
                name="research_year"
                defaultValue={detail[0].research_year}
                innerRef={register}
              >
                {Array.from(new Array(5), (v, i) => (
                  <option key={i} value={fullyear - i}>
                    {fullyear - i}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="level">ระดับงานวิจัย:</Label>
              <Input
                type="select"
                name="level"
                defaultValue={detail[0].level}
                onChange={onChange}
              >
                {typelevel.map((opt) => (
                  <option value={opt.levelKey} key={opt.levelKey}>
                    {opt.level}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="level_sub1">*อยู่ในเกณฑ์ กพอ หรือไม่?</Label>
              <Input
                type="select"
                name="level_sub1"
                innerRef={register}
                defaultValue={detail[0].level_sub1}
              >
                <option value="OCSC">อยู่ในเกณฑ์</option>
                <option value="NON-OCSC">ไม่อยู่ในเกณฑ์</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="level_sub2">*ฐานข้อมูล</Label>
              {levelStart2 ? null : (
                <Input
                  type="select"
                  name="level_sub2"
                  innerRef={register}
                  defaultValue={detail[0].level_sub2}
                >
                  {Level2.map((sublevel_2) => (
                    <option
                      key={sublevel_2.sublevel_2_Key}
                      value={sublevel_2.sublevel_2_Key}
                    >
                      {sublevel_2.sublevel_2}
                    </option>
                  ))}
                </Input>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="tagResearch">Tag:</Label>
              <EditTags />
            </FormGroup>

            <FormGroup>
              <Label for="uploadfile">
                *Upload File: (เฉพาะไฟล์ PDF เท่านั้น)
              </Label>
              {OldUpload ? (
                <Fragment>
                  {" "}
                  <Button color="link" size="sm" onClick={toggleOldPDF}>
                    (ตรวจไฟล์ PDF เก่า)
                  </Button>
                </Fragment>
              ) : null}

              <CustomInput
                type="file"
                id="fileupload"
                name="fileupload"
                label={LabelFile}
                onChange={onChange}
                accept="application/pdf"
              />
            </FormGroup>
            <FormGroup>
              <Button color="dark">Submit</Button>
            </FormGroup>
          </Form>
        </Container>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, { uploadfile })(ResearchEditPage));
