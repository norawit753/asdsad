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

const ResearchEditPage = (props) => {
  const user = useSelector((state) => state.main.auth.user);
  const detail = useSelector((state) => state.research.list.detail);

  const { register, handleSubmit, reset } = useForm();

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

        reset({
          research_name: detail[0].research_name,
          article_type: detail[0].article_type,
          research_year: detail[0].research_year,
        });
      }
    };
    fetchData();
  }, [detail, reset]);

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
              <Input name="research_name" innerRef={register}></Input>
            </FormGroup>
            {/* ต้องแก้ */}
            <FormGroup>
              <Label for="article_type">ประเภทงานวิจัย:</Label>
              <Input
                type="select"
                name="article_type"
                defaultValue={detail[0].article_type}
              >
                <option value="2222">2222</option>
                <option value={detail[0].article_type}>1111</option>
              </Input>
            </FormGroup>
            {/* ต้องแก้ */}
            <FormGroup>
              <Label for="article_type">ปีที่ Pubilc:</Label>
              <Input
                type="text"
                name="research_year"
                innerRef={register}
                readOnly
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="level">ระดับงานวิจัย:</Label>
            </FormGroup>
          </Form>
        </Container>
      ) : null}
    </Fragment>
  );
};

export default withRouter(connect(null, null)(ResearchEditPage));
