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
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import typeartical from "../../../utilis/research/typearticle.json";
import typelevel from "../../../utilis/research/typelevel.json";
import EditTags from "../../research/TagsEdit";

const ResearchEditPage = (props) => {
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);
  const fullyear = new Date().getFullYear();

  const { register, handleSubmit } = useForm();

  // level0
  // value เปลี่ยนเมื่อ level เปลี่ยน
  const [levelChange, setlevelChange] = useState("");
  // trigger เมื่อ level เปลี่ยน
  const [levelStart, setlevelStart] = useState(true);
  // ใช้ trigger เมื่อเปลี่ยน level sub 2 สำเร็จ
  const [levelStart2, setlevelStart2] = useState(true);

  const [Level2, setLevel2] = useState([
    {
      sublevel_2_Key: "",
      sublevel_2: "---โปรดเลือก---",
    },
  ]);

  useEffect(() => {
    if (detail) {
      if (levelStart) {
        setlevelStart(false);
        setlevelStart2(true);
        setlevelChange(detail[0].level);
      }
    }
  }, [detail]);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "level") {
      setlevelChange(value);
      console.log(value);
    }
  };

  function onSubmit(data) {
    console.log(data);
  }

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
              <Button color="dark">Submit</Button>
            </FormGroup>
          </Form>
        </Container>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchEditPage));
