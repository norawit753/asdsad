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
import PropTypes from "prop-types";

// Action
import { uploadfile } from "../../../actions/research/formAction";
import { newlist as sendList } from "../../../actions/research/editAction";
import { getemail_committee } from "../../../actions/research/emailAction";

// Json
import typeartical from "../../../utilis/research/typearticle.json";
import typelevel from "../../../utilis/research/typelevel.json";
import patentJson from "../../../utilis/research/typepatent.json";
import pettypatentJson from "../../../utilis/research/typepettypatent.json";

import EditTags from "../../research/TagsEdit";

// Env
import NewLineToBr from "../../../utilis/newLine";
import { config } from "../../../utilis/config";

const ResearchEditPage = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);
  const trigger = useSelector((state) => state.research.trigger);
  const e_research = useSelector((state) => state.main.auth.service.e_research);
  const [FullName, setFullName] = useState(null);
  const fullyear = new Date().getFullYear();
  // Start Form
  const [start, setStart] = useState(true);
  // Form
  const { register, handleSubmit } = useForm();
  // trigger research type
  const [ConfName, setConfName] = useState(false);
  const [PatentName, setPatentName] = useState(false);
  const [PettyPatentName, setPettyPatentName] = useState(false);
  // From Email Reducer
  // get email
  const email_committee = useSelector(
    (state) => state.research.email.email_committee
  );
  const [countEmail, setcountEmail] = useState(0);
  // level0
  // value เปลี่ยนเมื่อ level เปลี่ยน
  const [levelChange, setlevelChange] = useState("");
  // trigger เมื่อ level เปลี่ยน
  const [levelStart, setlevelStart] = useState(true);
  // ใช้ trigger เมื่อเปลี่ยน level sub 2 สำเร็จ
  const [levelStart2, setlevelStart2] = useState(true);

  // config
  const conResearch = config.connectResearchAPI;
  // Tag
  const tagstate = useSelector((state) => state.research.form.tags);
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
    sendList: PropTypes.func.isRequired,
    getemail_committee: PropTypes.func.isRequired,
  };

  const { uploadfile, sendList, getemail_committee } = props;

  // When Send Form Success
  useEffect(() => {
    if (trigger.send_success) {
      const goMainResearchPage = async () => {
        await alert("ส่งงานวิจัยสำเร็จ");
        dispatch({ type: "PAGE_LOADING" });
        props.history.push("/research");
      };
      goMainResearchPage();
    }
  }, [trigger]);

  // Start EditPage
  useEffect(() => {
    if (start) {
      if (e_research) {
        const get_email_committee = async () => {
          const Department = await {
            token,
            dep: user.dep,
          };
          // console.log(Department);
          await getemail_committee(Department);
        };
        get_email_committee();
      }
      setStart(false);
    }
  }, [start]);

  // IF GET EMAIL COMMITTEE THEN COUNT EMAIL
  useEffect(() => {
    if (email_committee) {
      setcountEmail(email_committee.length);
    }
  }, [email_committee]);

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
      if (detail[0].firstname && detail[0].lastname) {
        setFullName(detail[0].firstname + " " + detail[0].lastname);
      }

      if (detail[0].article_type) {
        if (detail[0].article_type === "CONFERENCE") {
          setConfName(true);
          setPatentName(false);
          setPettyPatentName(false);
        } else if (detail[0].article_type === "PATENT") {
          setConfName(false);
          setPatentName(true);
          setPettyPatentName(false);
        } else if (detail[0].article_type === "PETTY-PATENT") {
          setConfName(false);
          setPatentName(false);
          setPettyPatentName(true);
        } else {
          setConfName(false);
          setPatentName(false);
          setPettyPatentName(false);
        }
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
    if (name === "level0") {
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
    // article_type
    if (name === "article_type") {
      if (value === "CONFERENCE") {
        setConfName(true);
        setPatentName(false);
        setPettyPatentName(false);
      } else if (value === "PATENT") {
        setConfName(false);
        setPatentName(true);
        setPettyPatentName(false);
      } else if (value === "PETTY-PATENT") {
        setConfName(false);
        setPatentName(false);
        setPettyPatentName(true);
      } else {
        setConfName(false);
        setPatentName(false);
        setPettyPatentName(false);
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
      data_email: email_committee,
      count_email: countEmail,
      _id: detail[0]._id,
      buasri_id: detail[0].buasri_id,
      year: detail[0].year ? detail[0].year : undefined,
      email: detail[0].email,
      dep: detail[0].dep,
      firstname: detail[0].firstname,
      lastname: detail[0].lastname,
      position: detail[0].position,
      research_name: e.research_name
        ? e.research_name
        : detail[0].research_name
        ? detail[0].research_name
        : undefined,
      article_type: e.article_type
        ? e.article_type
        : detail[0].article_type
        ? detail[0].article_type
        : undefined,
      level: e.level0
        ? e.level0
        : detail[0].level
        ? detail[0].level
        : undefined,
      level_sub1: e.level_sub1
        ? e.level_sub1
        : detail[0].level_sub1
        ? detail[0].level_sub1
        : undefined,
      level_sub2: e.level_sub2
        ? e.level_sub2
        : detail[0].level_sub2
        ? detail[0].level_sub2
        : undefined,
      type_name:
        PatentName || PettyPatentName
          ? e.type_name
            ? e.type_name
            : detail[0].type_name
          : undefined,
      quartile: e.quartile
        ? e.quartile
        : detail[0].quartile
        ? detail[0].quartile
        : undefined,
      author_type: e.author_type
        ? e.author_type
        : detail[0].author_type
        ? detail[0].author_type
        : undefined,
      research_year: e.research_year,
      conference_name: ConfName
        ? e.conference_name
          ? e.conference_name
          : detail[0].conf[0].conf_name
        : undefined,
      conf_country: ConfName
        ? e.conf_country
          ? e.conf_country
          : detail[0].conf[0].country
        : undefined,
      conf_local: ConfName
        ? e.conf_local
          ? e.conf_local
          : detail[0].conf[0].local_name
        : undefined,
      tags: tagstate ? tagstate : detail[0].tags ? detail[0].tags : undefined,
      note: detail[0].note,
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
      status: "WAITING",
    };

    await upload_newpdf();
    await sendList(newList);

    // console.log(newList);
  };

  return (
    <Fragment>
      {detail ? (
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="fullname">ผู้ส่ง:</Label>
              <Input name="fullname" defaultValue={FullName} readOnly></Input>
            </FormGroup>
            <FormGroup>
              <Label for="research_name">ชื่องานวิจัย:</Label>
              <Input
                name="research_name"
                onChange={onChange}
                innerRef={register}
                defaultValue={detail[0].research_name}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="article_type">ประเภทของบทความ:</Label>
              <Input
                type="select"
                name="article_type"
                onChange={onChange}
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

            {PatentName ? (
              <Fragment>
                <FormGroup>
                  <Label for="type_name">*กลุ่มงานของสิทธิบัตร:</Label>
                  <Input
                    type="select"
                    name="type_name"
                    innerRef={register}
                    onChange={onChange}
                    defaultValue={
                      detail[0].article_type === "PATENT"
                        ? detail[0].article_type_name[0].type_name
                        : null
                    }
                    required
                  >
                    {patentJson.map((patent) => (
                      <option key={patent.No} value={patent.Value}>
                        {patent.Name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Fragment>
            ) : null}
            {PettyPatentName ? (
              <Fragment>
                <FormGroup>
                  <Label for="type_name">*กลุ่มงานของอนุสิทธิบัตร:</Label>
                  <Input
                    type="select"
                    name="type_name"
                    innerRef={register}
                    onChange={onChange}
                    defaultValue={
                      detail[0].article_type === "PETTY-PATENT"
                        ? detail[0].article_type_name[0].type_name
                        : null
                    }
                    required
                  >
                    {pettypatentJson.map((petty) => (
                      <option key={petty.No} value={petty.Value}>
                        {petty.Name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Fragment>
            ) : null}

            <FormGroup>
              <Label for="research_year">ปีที่ Pubilc:</Label>
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
              <Label for="level0">ระดับงานวิจัย:</Label>
              <Input
                type="select"
                name="level0"
                defaultValue={detail[0].level}
                onChange={onChange}
                innerRef={register}
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
              <Label for="quartile">*Quartile ที่ส่งผลงาน</Label>
              <Input
                type="select"
                name="quartile"
                innerRef={register}
                defaultValue={detail[0].quartile}
                required
              >
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="author">*ประเภทผู้เขียน</Label>
              <Input
                name="author_type"
                type="select"
                innerRef={register}
                defaultValue={detail[0].author_type}
                required
              >
                <option value="AUTHOR">ผู้เขียนบทความ</option>
                <option value="CO-AUTHOR">ผู้ร่วมเขียนบทความ</option>
              </Input>
            </FormGroup>

            {ConfName ? (
              <Fragment>
                <FormGroup>
                  <Label for="conference_name">
                    *ชื่อ Conference ที่เข้าร่วม
                  </Label>
                  <Input
                    type="text"
                    name="conference_name"
                    defaultValue={
                      detail[0].article_type === "CONFERENCE"
                        ? detail[0].conf[0]
                          ? detail[0].conf[0].conf_name
                          : null
                        : null
                    }
                    innerRef={register}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="conf_country">*ชื่อประเทศที่เข้าร่วม</Label>
                  <Input
                    type="text"
                    name="conf_country"
                    defaultValue={
                      detail[0].article_type === "CONFERENCE"
                        ? detail[0].conf[0]
                          ? detail[0].conf[0].country
                          : null
                        : null
                    }
                    innerRef={register}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="conf_local">*ชื่อสถานที่ที่เข้าร่วม</Label>
                  <Input
                    type="text"
                    name="conf_local"
                    defaultValue={
                      detail[0].article_type === "CONFERENCE"
                        ? detail[0].conf[0]
                          ? detail[0].conf[0].local_name
                          : null
                        : null
                    }
                    innerRef={register}
                    required
                  />
                </FormGroup>
              </Fragment>
            ) : null}
            {/* ต้องแก้ ข้อมูล Tag */}
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

export default withRouter(
  connect(null, { uploadfile, sendList, getemail_committee })(ResearchEditPage)
);
