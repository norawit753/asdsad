import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Container, Table, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

// JSON
import statusJson from "../../../utilis/research/typestatus.json";
import level0Json from "../../../utilis/research/typelevel.json";
import level_sub1Json from "../../../utilis/research/typelevel_sub1.json";
import authorJson from "../../../utilis/research/typeauthor.json";

import BackToResearchPage from "../../research/BackResearchPage";
import UpdateStatusModal from "../../research/UpdateStatusModal";

// Env
import NewLineToBr from "../../../utilis/newLine";
import { config } from "../../../utilis/config";

const ResearchDetailPage = (props) => {
  const researchUser = useSelector(
    (state) => state.main.auth.service.e_research
  );
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);
  const [UploadFilter, setUploadFilter] = useState(null);
  // config
  const conResearch = config.connectResearchAPI;
  // trigger
  const trigger_status = useSelector(
    (state) => state.research.trigger.update_status
  );

  const [Level0Filter, setLevel0Filter] = useState(null);
  const [Level1Filter, setLevel1Filter] = useState(null);
  const [AuthorFilter, setAuthorFilter] = useState(null);
  const [StatusFilter, setStatusFilter] = useState(null);
  const [TagFilter, setTagFilter] = useState(null);
  const [NoteFilter, setNoteFilter] = useState("ไม่มีรายละเอียด");

  const [GoEdit, setGoEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trigger_status) {
      const GotoMainPage = async () => {
        await alert("อัพเดตสถานะสำเร็จ");
        await dispatch({ type: "PAGE_LOADING" });
        await props.history.push("/research");
      };
      GotoMainPage();
    }
  }, [trigger_status]);

  useMemo(() => {
    if (detail) {
      // LEVEL
      if (detail[0].level) {
        setLevel0Filter(
          level0Json
            .filter((data) => {
              if (data.levelKey === detail[0].level) {
                return data.level;
              } else {
                return null;
              }
            })
            .map((data) => {
              if (data.levelKey === detail[0].level) {
                return <Fragment key={data.levelKey}>{data.level}</Fragment>;
              } else {
                return null;
              }
            })
        );
      }
      // LEVEL_SUB1
      if (detail[0].level_sub1) {
        setLevel1Filter(
          level_sub1Json
            .filter((data) => {
              if (data.levelKey === detail[0].level_sub1) {
                return data.level;
              } else {
                return null;
              }
            })
            .map((data) => {
              if (data.levelKey === detail[0].level_sub1) {
                return <Fragment key={data.levelKey}>{data.level}</Fragment>;
              } else {
                return null;
              }
            })
        );
      }
      // AUTHOR
      if (detail[0].author_type) {
        setAuthorFilter(
          authorJson
            .filter((data) => {
              if (data.authorKey === detail[0].author_type) {
                return data.author;
              } else {
                return null;
              }
            })
            .map((data) => {
              if (data.authorKey === detail[0].author_type) {
                return <Fragment key={data.authorKey}>{data.author}</Fragment>;
              } else {
                return null;
              }
            })
        );
      }
      // STATUS
      if (detail[0].status) {
        setStatusFilter(
          statusJson
            .filter((data) => {
              if (data.status === detail[0].status) {
                return data.name;
              } else {
                return null;
              }
            })
            .map((data) => {
              if (data.status === detail[0].status) {
                return <Fragment key={data.status}>{data.name}</Fragment>;
              } else {
                return null;
              }
            })
        );
      }
      // TAGS
      if (detail[0].tags) {
        setTagFilter(
          detail[0].tags.map((data) => {
            if (data) {
              return <Fragment key={data._id}>{data.text}, </Fragment>;
            }
          })
        );
      }
      if (detail[0].note) {
        setNoteFilter(detail[0].note);
      }
      if (detail[0].file_name) {
        setUploadFilter(conResearch + detail[0].file_path);
      }
    }
    if (!detail) {
      props.history.push("/research");
    }
  }, [detail]);

  //UploadFilterChange
  useEffect(() => {
    if (UploadFilter) {
      // console.log(UploadFilter);
    }
  }, [UploadFilter]);

  useEffect(() => {
    if (GoEdit) {
      props.history.push("/research/edit");
      dispatch({ type: "PAGE_LOADING" });
      setGoEdit(false);
    }
  }, [GoEdit]);

  const toggleEdit = () => {
    setGoEdit(true);
  };

  // Button PDF
  const togglePDF = () => {
    window.open(UploadFilter);
  };

  return (
    <Fragment>
      <Container>
        <BackToResearchPage />
      </Container>
      {detail ? (
        <Fragment>
          <Container>
            <h4>รายละเอียด</h4>
            <br />
            <Table hover responsive>
              <tbody>
                <tr>
                  <th scope="row">ชื่องานวิจัย:</th>
                  <td>{detail[0].research_name}</td>
                </tr>
                <tr>
                  <th scope="row">ประเภทงานวิจัย:</th>
                  <td>{detail[0].article_type}</td>
                </tr>
                {detail[0].article_type === "PATENT" ||
                detail[0].article_type === "PETTY-PATENT" ? (
                  <Fragment>
                    <tr>
                      <th scope="row">ประเภทสิทธิบัตร, อนุสิทธิบัตร:</th>
                      <td>{detail[0].article_type_name[0].type_name}</td>
                    </tr>
                  </Fragment>
                ) : detail[0].article_type === "CONFERENCE" ? (
                  <Fragment>
                    <tr>
                      <th scope="row">ชื่อ conference ที่จัด:</th>
                      <td>{detail[0].conf[0].conf_name}</td>
                    </tr>
                    <tr>
                      <th scope="row">สถานที่จัดงาน conference:</th>
                      <td>{detail[0].conf[0].local_name}</td>
                    </tr>
                    <tr>
                      <th scope="row">ประเทศที่จัดงาน conference:</th>
                      <td>{detail[0].conf[0].country}</td>
                    </tr>
                  </Fragment>
                ) : null}
                <tr>
                  <th scope="row">ปีที่ Pubilc</th>
                  <td>{detail[0].research_year}</td>
                </tr>
                <tr>
                  <th scope="row">Quartile</th>
                  <td>{detail[0].quartile}</td>
                </tr>
                <tr>
                  <th scope="row">ระดับงานวิจัย</th>
                  <td>{Level0Filter}</td>
                </tr>
                <tr>
                  <th scope="row">อยู่ในเกณฑ์ กพอ</th>
                  <td>{Level1Filter}</td>
                </tr>
                <tr>
                  <th scope="row">ฐานข้อมูล</th>
                  <td>{detail[0].level_sub2}</td>
                </tr>
                <tr>
                  <th scope="row">ประเภทผู้เขียน</th>
                  <td>{AuthorFilter}</td>
                </tr>
                {UploadFilter ? (
                  <tr>
                    <th scope="row">PDF File:</th>
                    <td>
                      <Button color="info" size="sm" onClick={togglePDF}>
                        PDF File
                      </Button>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th scope="row">tags</th>
                  <td>{TagFilter}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
          <Container>
            <h4>สถานะล่าสุด</h4>
            <Table hover responsive>
              <tbody>
                <tr>
                  <th scope="row">สถานะ:</th>
                  <td
                    style={
                      detail[0].status === "WAITING"
                        ? { color: "blue" }
                        : detail[0].status === "WAITINGADMIN"
                        ? { color: "blue" }
                        : detail[0].status === "EDIT"
                        ? { color: "blue" }
                        : detail[0].status === "REJECT"
                        ? { color: "red" }
                        : detail[0].status === "APPROVED"
                        ? { color: "green" }
                        : { color: "none" }
                    }
                  >
                    {StatusFilter}
                  </td>
                </tr>
                <tr>
                  <th scope="row">รายละเอียด:</th>
                  <td style={{ color: "red" }}>{NoteFilter}</td>
                </tr>
              </tbody>
            </Table>
            {researchUser.position === "COMMITTEE" &&
            detail[0].status === "WAITING" ? (
              detail[0].committee === user.buasri_id ||
              detail[0].committee === null ? (
                <UpdateStatusModal />
              ) : null
            ) : null}
            {researchUser.position === "ADMIN" &&
            detail[0].status === "WAITINGADMIN" ? (
              detail[0].admin === user.buasri_id || detail[0].admin === null ? (
                <UpdateStatusModal />
              ) : null
            ) : null}
            {detail[0].status === "EDIT" &&
            detail[0].buasri_id === user.buasri_id ? (
              <Button onClick={toggleEdit} color="warning">
                แก้ไขข้อมูล
              </Button>
            ) : null}
          </Container>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchDetailPage));
