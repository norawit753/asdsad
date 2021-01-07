import React, { useState, useEffect, Fragment } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabContent,
  TabPane,
  Container,
  Table,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { connect, useSelector } from "react-redux";
import { Route, Switch, Link, useLocation } from "react-router-dom";

import DepJson from "../../../utilis/typedep";
import UserJson from "../../../utilis/typeuser";
import BackMainPage from "../../main/BackMainPage";

const UserPage = (props) => {
  const [activeTab, setActiveTab] = useState("userDetail");
  const user = useSelector((state) => state.main.auth.user);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const depFilter = DepJson.filter((data) => {
    if (data.currentNameEN === user.dep) {
      return data.currentNameTH;
    } else {
      return null;
    }
  }).map((data) => {
    if (data.currentNameEN === user.dep) {
      return <>{data.currentNameTH}</>;
    } else {
      return null;
    }
  });

  const userFilter = UserJson.filter((data) => {
    if (data.type === user.type) {
      return data.name;
    } else {
      return null;
    }
  }).map((data) => {
    if (data.type === user.type) {
      return <>{data.name}</>;
    } else {
      return null;
    }
  });

  return (
    <Fragment>
      <Container>
        <Switch>
          <Route exact path="/users">
            <br />
            {user.buasri_id ? (
              <Fragment>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "userDetail",
                      })}
                      onClick={() => {
                        toggle("userDetail");
                      }}
                    >
                      ข้อมูลส่วนตัว
                    </NavLink>
                  </NavItem>
                  {user.position === "ADMIN" ? (
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "userList",
                        })}
                        onClick={() => {
                          toggle("userList");
                        }}
                      >
                        รายชื่อผู้ใช้งาน
                      </NavLink>
                    </NavItem>
                  ) : null}
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="userDetail">
                    <Container>
                      <Row>
                        <Col sm="12">
                          <Container>
                            <br />
                            <h4>รายละเอียด</h4>
                            <Table hover responsive>
                              <tbody>
                                <tr>
                                  <th scope="row">ชื่อ-นามสกุล</th>
                                  <td>
                                    {user.title}
                                    {user.firstname} {user.lastname}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">บัวศรีไอดี</th>
                                  <td>{user.buasri_id}</td>
                                </tr>
                                <tr>
                                  <th scope="row">อีเมล</th>
                                  <td>{user.email}</td>
                                </tr>
                                <tr>
                                  <th scope="row">หน่วยงาน</th>
                                  <td>{depFilter}</td>
                                </tr>
                                <tr>
                                  <th scope="row">ประเภทผู้ใช้งาน</th>
                                  <td>{userFilter}</td>
                                </tr>
                              </tbody>
                            </Table>
                            {/* <Link to="/users/edit"> */}
                            <Button color="warning">แก้ไข</Button>
                            {/* </Link> */}
                            <BackMainPage />
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </TabPane>
                  <TabPane tabId="userList">
                    <Row>
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                      </Table>
                    </Row>
                  </TabPane>
                </TabContent>
              </Fragment>
            ) : null}
          </Route>
        </Switch>
      </Container>
    </Fragment>
  );
};

export default connect(null, null)(UserPage);
