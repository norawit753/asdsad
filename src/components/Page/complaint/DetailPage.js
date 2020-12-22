import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Table } from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import statusJson from "../../../utilis/typestatus.json";
import typeJson from "../../../utilis/typecomplaint.json";
import UpdateStatusModal from "../../complaint/UpdateStatusModal";

const ComplaintDetailPage = (props) => {
  const detail = useSelector((state) => state.complaint.list.detail);
  const complaintUser = useSelector((state) => state.complaint.auth.user);
  const [TypeFilter, setTypeFilter] = useState(null);
  const [StatusFilter, setStatusFilter] = useState(null);
  const [NoteFilter, setNoteFilter] = useState("ไม่มีรายละเอียด");
  const [UploadFilter, setUploadFilter] = useState(null);

  useMemo(() => {
    if (detail) {
      if (detail[0].status) {
        setStatusFilter(
          statusJson
            .filter((data) => {
              if (data.status === detail[0].status.status) {
                return data.name;
              } else {
                return null;
              }
            })
            .map((data) => {
              if (data.status === detail[0].status.status) {
                return <Fragment>{data.name}</Fragment>;
              } else {
                return null;
              }
            })
        );
        setTypeFilter(
          typeJson
            .filter((data) => {
              if (data.type === detail[0].type) {
                return data.name;
              } else {
                return null;
              }
            })
            .map((data) => {
              if (data.type === detail[0].type) {
                return <Fragment>{data.name}</Fragment>;
              } else {
                return null;
              }
            })
        );
      }
      if (detail[0].status.note) {
        setNoteFilter(detail[0].status.note);
      }
      if (detail[0].upload.file_name) {
        setUploadFilter("http://localhost:5002" + detail[0].upload.file_path);
      }
    }
  }, [detail]);
  //   console.log(StatusFilter);
  return (
    <Fragment>
      {detail ? (
        <Fragment>
          <Container>
            <h4>รายละเอียด</h4>
            <Table hover responsive>
              <tbody>
                <tr>
                  <th scope="row">หัวข้อที่แจ้ง:</th>
                  <td>{detail[0].topic}</td>
                </tr>
                <tr>
                  <th scope="row">ประเภทการร้องเรียน:</th>
                  <td>{TypeFilter}</td>
                </tr>
                <tr>
                  <th scope="row">รายละเอียด:</th>
                  <td>{detail[0].detail}</td>
                </tr>
                <tr>
                  <th scope="row">E-mail:</th>
                  <td>{detail[0].email}</td>
                </tr>
                <tr>
                  <th scope="row">เบอร์ติดต่อ:</th>
                  <td>{detail[0].phone}</td>
                </tr>
                {UploadFilter ? (
                  <tr>
                    <th scope="row">รูปภาพ:</th>
                    <td>
                      <img src={UploadFilter} alt="" width="300"></img>
                    </td>
                  </tr>
                ) : null}
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
                  <td colspan="4">{NoteFilter}</td>
                </tr>
              </tbody>
            </Table>
            {complaintUser.position === "ADMIN" ? <UpdateStatusModal /> : null}
          </Container>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ComplaintDetailPage));
