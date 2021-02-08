import React, { Fragment, useState } from "react";
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

const ResearchFormPage = (props) => {
  const { handleSubmit, register, watch } = useForm();

  return (
    <Fragment>
      <Container>
        <BackResearchPage />
        <h4>
          <b>แบบฟอร์มเพิ่มงานวิจัย</b>
        </h4>

        <br />
      </Container>
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchFormPage));
