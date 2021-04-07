import React, { useState, useEffect, Fragment, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Container, Table } from "reactstrap";
import { withRouter } from "react-router-dom";

import statusJson from "../../../utilis/research/typestatus.json";
import BackToResearchPage from "../../research/BackResearchPage";
import UpdateStatusModal from "../../research/UpdateStatusModal";

// Env
import NewLineToBr from "../../../utilis/newLine";

const ResearchDetailPage = (props) => {
  const researchUser = useSelector(
    (state) => state.main.auth.service.e_research
  );
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);

  // trigger
  const trigger_status = useSelector(
    (state) => state.research.trigger.update_status
  );

  const [StatusFilter, setStatusFilter] = useState(null);
  const [TagFilter, setTagFilter] = useState(null);
  const [NoteFilter, setNoteFilter] = useState("ไม่มีรายละเอียด");
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
    }
  }, [detail]);

  useEffect(() => {
    if (!detail) {
      props.history.push("/research");
    }
  }, [detail]);

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
                <tr>
                  <th scope="row">ปีที่ Pubilc</th>
                  <td>{detail[0].research_year}</td>
                </tr>
                <tr>
                  <th scope="row">ระดับงานวิจัย</th>
                  <td>{detail[0].level}</td>
                </tr>
                <tr>
                  <th scope="row">อยู่ในเกณฑ์ กพอ</th>
                  <td>{detail[0].level_sub1}</td>
                </tr>
                <tr>
                  <th scope="row">ฐานข้อมูล</th>
                  <td>{detail[0].level_sub2}</td>
                </tr>
                <tr>
                  <th scope="row">ประเภทผู้เขียน</th>
                  <td>{detail[0].author_type}</td>
                </tr>
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
                  <td>{StatusFilter}</td>
                </tr>
                <tr>
                  <th scope="row">รายละเอียด:</th>
                  <td>{NoteFilter}</td>
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
              <UpdateStatusModal />
            ) : null}
          </Container>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchDetailPage));
