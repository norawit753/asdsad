import React, { Fragment, useState, useMemo } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
} from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import BackResearchPage from "../../research/BackResearchPage";
import { withRouter } from "react-router-dom";
import articleJson from "../../../utilis/research/typearticle.json";
import levelJson from "../../../utilis/research/typelevel.json";

const ResearchFormPage = (props) => {
  const { handleSubmit, register, watch } = useForm();

  // From Main
  const token = useSelector((state) => state.main.auth.token);
  const user = useSelector((state) => state.main.auth.user);

  // Value Level
  const [Level0, setLevel0] = useState(null);
  const [Level1, setLevel1] = useState([
    {
      sublevel_1_Key: "",
      sublevel_1: "---โปรดเลือก---",
    },
    {
      sublevel_1_Key: "OCSC",
      sublevel_1: "อยู่ในเกณฑ์ กพอ",
    },
    {
      sublevel_1_Key: "NON-OCSC",
      sublevel_1: "ไม่อยู่ในเกณฑ์ กพอ",
    },
  ]);
  const [Level2, setLevel2] = useState([
    {
      sublevel_2_Key: "",
      sublevel_2: "---โปรดเลือก---",
    },
  ]);
  const [ConfName, setConfName] = useState(false);
  const fullyear = new Date().getFullYear();
  // Upload File
  const [LabelFile, setLabelFile] = useState("Choose File");
  const [CheckFile, setCheckFile] = useState(false);
  const [CheckFileCorrect, setCheckFileCorrect] = useState(false);
  const [CheckNoFile, setCheckNoFile] = useState(true);
  const [mergeName, setMergeName] = useState("");
  const [filePath, setfilePath] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "article") {
      if (value === "CONFERENCE") {
        setConfName(true);
      } else {
        setConfName(false);
      }
    }
    if (name === "level") {
      setLevel0(value);
      if (value === "INTERNATIONAL" && Level1) {
        setLevel2([
          { sublevel_2_Key: "", sublevel_2: "---โปรดเลือก---" },
          { sublevel_2_Key: "SCOPUS", sublevel_2: "Scopus" },
          { sublevel_2_Key: "WEB-OF-SCIENCE", sublevel_2: "lsi" },
        ]);
      } else if (value === "COUNTRY" && Level1) {
        setLevel2([
          { sublevel_2_Key: "", sublevel_2: "---โปรดเลือก---" },
          { sublevel_2_Key: "TCI-TYPE-1", sublevel_2: "TCI-TYPE-1" },
          { sublevel_2_Key: "TCI-TYPE-2", sublevel_2: "TCI-TYPE-2" },
        ]);
      } else {
        setLevel2([
          {
            sublevel_2_Key: "",
            sublevel_2: "---โปรดเลือก---",
          },
        ]);
      }
    }
  };
  const onSubmit = async (e) => {
    console.log("Level0: " + e.level);
    console.log("Level1: " + e.sub_level_1);
    console.log("Level2: " + e.sub_level_2);
    if (ConfName) {
      const newList = await {
        token,
        year: fullyear,
        buasri_id: user.buasri_id,
        email: user.email,
        article: e.article,
        level: e.level,
        sub_level_1: e.sub_level_1,
        sub_level_2: e.sub_level_2,
        conf_year: e.year,
        author: e.author,
        name: e.name,
        conference_name: e.conf_name,
        status: "WAITING",
      };
      console.log(newList);
    } else {
      const newList = await {
        token,
        year: fullyear,
        buasri_id: user.buasri_id,
        email: user.email,
        article: e.article,
        level: e.level,
        sub_level_1: e.sub_level_1,
        sub_level_2: e.sub_level_2,
        conf_year: e.year,
        author: e.author,
        name: e.name,
        status: "WAITING",
      };
      console.log(newList);
    }
  };

  return (
    <Fragment>
      <Container>
        <BackResearchPage />
        <h4>
          <b>แบบฟอร์มเพิ่มงานวิจัย</b>
        </h4>

        <br />
      </Container>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <p className="text-danger">
              แบบฟอร์มนี้มีไว้สำหรับการส่งงานวิจัย
              โดยข้อมูลต่างๆที่ท่านกรอกผ่านแบบฟอร์มนี้{" "}
            </p>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Label for="article">*ประเภทของบทความ:</Label>
            {articleJson.map((article) => (
              <FormGroup check key={article.articleKEY}>
                <Label check>
                  <Input
                    type="radio"
                    name="article"
                    innerRef={register}
                    value={article.articleKEY}
                    onChange={onChange}
                    required
                  />
                  {" " + article.article}
                </Label>
              </FormGroup>
            ))}
          </FormGroup>
          <FormGroup>
            <Label for="level">*ระดับงานวิจัย</Label>
            <Input
              type="select"
              name="level"
              innerRef={register}
              onChange={onChange}
              required
            >
              <option value="">---โปรดเลือก---</option>
              {levelJson.map((level) => (
                <option value={level.levelKey} key={level.levelKey}>
                  {level.level}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="sub_level_1">*อยู่ในเกณฑ์ กพอ หรือไม่?</Label>
            <Input
              type="select"
              name="sub_level_1"
              innerRef={register}
              onChange={onChange}
              required
            >
              <option value="">---โปรดเลือก---</option>
              <option value="OCSC">อยู่ในเกณฑ์</option>
              <option value="NON-OCSC">ไม่อยู่ในเกณฑ์</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="sub_level_2">*ฐานข้อมูล</Label>
            <Input
              type="select"
              name="sub_level_2"
              innerRef={register}
              required
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
          </FormGroup>
          <FormGroup>
            <Label for="year">*ปีที่เผยแพร่</Label>
            <Input type="select" name="year" innerRef={register} required>
              {Array.from(new Array(5), (v, i) => (
                <option key={i} value={fullyear - i}>
                  {fullyear - i}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Label for="author">*ประเภทผู้เขียน</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="author"
                  innerRef={register}
                  value="AUTHOR"
                  required
                />{" "}
                ผู้เขียนบทความ
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="author"
                  innerRef={register}
                  value="CO-AUTHOR"
                  required
                />{" "}
                ผู้ร่วมเขียนบทความ
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="name">*ชื่อบทความ</Label>
            <Input type="text" name="name" innerRef={register} required />
          </FormGroup>
          {ConfName ? (
            <FormGroup>
              <Label for="conf_name">ชื่อ Conference ที่เข้าร่วม</Label>
              <Input
                type="text"
                name="conf_name"
                innerRef={register}
                required
              />
            </FormGroup>
          ) : null}

          <FormGroup>
            <Label for="uploadfile">
              *Upload File: (เฉพาะไฟล์ PDF เท่านั้น)
            </Label>
            <CustomInput
              type="file"
              id="fileupload"
              name="fileupload"
              // label={LabelFile}
              // onChange={onChange}
              accept="application/pdf"
            />
          </FormGroup>
          <FormGroup>
            <Button color="dark">Submit</Button>
          </FormGroup>
        </Form>
      </Container>
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchFormPage));
