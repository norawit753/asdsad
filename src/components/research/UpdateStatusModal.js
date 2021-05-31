import React, { useState, useEffect, Fragment } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  status_committee,
  status_admin,
} from "../../actions/research/listAction";

// Get E-mail Action
import { getemail_admin } from "../../actions/research/emailAction";

const UpdateStatusModal = (props) => {
  const { handleSubmit, register } = useForm();

  const user = useSelector((state) => state.main.auth.user);
  const e_research = useSelector((state) => state.main.auth.service.e_research);
  const detail = useSelector((state) => state.research.list.detail);
  const token = useSelector((state) => state.main.auth.token);
  const dispatch = useDispatch();

  // ค่า status ที่ต้องการเปลี่ยน
  const initialValue = [
    { id: 0, value: "A", name: "1" },
    { id: 1, value: "B", name: "2" },
  ];
  const [StatusName, setStatusName] = useState(null);
  const [StatusChange, setStatusChange] = useState(initialValue);
  const [modal, setmodal] = useState(false);
  const [disButton, setdisButton] = useState(false);
  const [OpenComment, setOpenComment] = useState(false);

  // Email Reducer
  const email_admin = useSelector((state) => state.research.email.email_admin);
  const [countEmail, setcountEmail] = useState(0);

  // ////////////////////////////////////////////////////////////////////

  UpdateStatusModal.propTypes = {
    status_committee: PropTypes.func.isRequired,
    status_admin: PropTypes.func.isRequired,
    getemail_committee: PropTypes.func.isRequired,
    getemail_admin: PropTypes.func.isRequired,
  };
  const { status_committee, status_admin, getemail_admin } = props;

  // status ก่อนเปลี่ยน
  useEffect(() => {
    if (detail) {
      if (detail[0].status === "WAITING") {
        setStatusName("รอกรรมการตรวจสอบ");
      }
      if (detail[0].status === "WAITINGADMIN") {
        setStatusName("รอฝ่ายวิจัยตรวจสอบ");
      }
      if (detail[0].status === "REJECT") {
        setStatusName("ยกเลิก");
      }
      if (detail[0].status === "EDIT") {
        setStatusName("แก้ไข");
      }
      if (detail[0].status === "APPROVED") {
        setStatusName("ผ่านการตรวจสอบ");
      }
    }
    // eslint-disable-next-line
  }, [detail]);

  // status สำหรับเปลี่ยน
  useEffect(() => {
    const WaitingStatus = [
      {
        id: 0,
        value: "WAITINGADMIN",
        name: "ผ่านการตรวจสอบ ส่งให้ฝ่ายวิจัยตรวจสอบ",
      },
      { id: 1, value: "EDIT", name: "แก้ไข" },
      { id: 2, value: "REJECT", name: "ยกเลิก" },
    ];
    const WaitingAdminStatus = [
      { id: 0, value: "APPROVED", name: "ผ่านการตรวจสอบ" },
      { id: 1, value: "EDIT", name: "แก้ไข" },
      { id: 2, value: "REJECT", name: "ยกเลิก" },
    ];
    const EditStatus = [
      { id: 0, value: "WAITING", name: "ส่งกลับไปที่ผู้ส่งงานวิจัย" },
    ];

    if (StatusName) {
      if (detail[0].status === "WAITING") {
        setStatusChange(WaitingStatus);
      }
      if (detail[0].status === "WAITINGADMIN") {
        setStatusChange(WaitingAdminStatus);
      }
      if (detail[0].status === "EDIT") {
        setStatusChange(EditStatus);
      }
    }
    // eslint-disable-next-line
  }, [StatusName]);

  // Check หากมี modal ให้ดึง E-mail
  useEffect(() => {
    if (modal) {
      // Check Status
      if (detail) {
        if (detail[0].status === "WAITING") {
          const get_email_admin = async () => {
            const SendToken = await {
              token,
            };
            await getemail_admin(SendToken);
          };
          get_email_admin();
        }
      }
    }
  }, [modal]);

  // IF GET EMAIL ADMIN THEN COUNT EMAIL
  useEffect(() => {
    if (email_admin) {
      setcountEmail(email_admin.length);
    }
  }, [email_admin]);

  const toggle = async () => {
    await setmodal(!modal);
  };

  const onChange = async (e) => {
    const { name, value } = e.target;
    if (name === "status_change") {
      if (value === "EDIT") {
        setOpenComment(true);
      } else {
        setOpenComment(false);
      }
    }
  };

  const onSubmit = async (e) => {
    if (e_research) {
      if (e_research.position) {
        const Update = await {
          token,
          id: e.no_id,
          buasri_id: detail[0].buasri_id,
          committee:
            e_research.position === "COMMITTEE" ? user.buasri_id : undefined,
          admin: e_research.position === "ADMIN" ? user.buasri_id : undefined,
          email: detail[0].email,
          status: e.status_change,
          note: e.note,
          count_email:
            e.status_change === "WAITINGADMIN" ? countEmail : undefined,
          data_email:
            e.status_change === "WAITINGADMIN" ? email_admin : detail[0].email,
        };
        // console.log(Update);
        if (e_research.position === "ADMIN") {
          status_admin(Update);
        } else if (e_research.position === "COMMITTEE") {
          status_committee(Update);
        }
      }
    }
  };

  return (
    <Fragment>
      {detail[0].status !== "APPROVED" || detail[0].status !== "REJECT" ? (
        <Button onClick={toggle} disabled={disButton}>
          อัพเดตสถานะ
        </Button>
      ) : null}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>สถานะที่ต้องการอัพเดต</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="no_id">หมายเลขงานวิจัย</Label>
              <Input
                type="text"
                name="no_id"
                placeholder={detail[0]._id}
                value={detail[0]._id}
                innerRef={register}
                readOnly
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="current_status">สถานะปัจจุบัน</Label>
              <Input
                type="text"
                name="current_status"
                placeholder={StatusName}
                value={detail[0].status}
                innerRef={register}
                readOnly
              ></Input>
            </FormGroup>
            {OpenComment ? (
              <FormGroup>
                <Label for="note">*รายละเอียด</Label>
                <Input type="textarea" name="note" innerRef={register}></Input>
              </FormGroup>
            ) : null}

            <FormGroup>
              <Label for="status_change">สถานะที่ต้องการเปลี่ยน</Label>
              <Input
                type="select"
                name="status_change"
                onChange={onChange}
                innerRef={register}
              >
                {StatusChange.map((currentStatus, index) => (
                  <option
                    key={currentStatus.id}
                    name={currentStatus.name}
                    value={currentStatus.value}
                  >
                    {currentStatus.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button
              name="updateButton"
              disabled={disButton}
              color="dark"
              style={{ marginTop: "2rem" }}
              block
            >
              อัพเดตสถานะ
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default withRouter(
  connect(null, {
    status_committee,
    status_admin,
    getemail_admin,
  })(UpdateStatusModal)
);
