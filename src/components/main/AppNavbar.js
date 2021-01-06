import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faUser } from "@fortawesome/free-solid-svg-icons";

import {
  Navbar,
  NavLink,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";

import { START_APP } from "../../type/main/type";
import RegisterModal from "./RegisterModal";
import Logout from "./Logout";

import { clearErrors } from "../../actions/main/errorAction";
import { loadUser } from "../../actions/main/authAction";

const AppNavbar = (props) => {
  const [isOpen, setisOpen] = useState(false);
  const [startClear, setstartClear] = useState(false);

  const checkToken = useSelector((state) => state.main.auth.token);
  const checkAuth = useSelector((state) => state.main.auth.isAuthenticated);
  const nameUser = useSelector((state) => state.main.auth.user);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  AppNavbar.prototypes = {
    clearErrors: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  const { clearErrors, loadUser } = props;

  useEffect(() => {
    if (!startClear) {
      setstartClear(true);
    }
    if (startClear) {
      clearErrors();
      if (checkToken) {
        loadUser();
      }
    }
  }, [startClear]);

  return (
    <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
      <Container>
        <NavbarBrand href="/">ศูนย์บริการออนไลน์ คณะวิทยาศาสตร์</NavbarBrand>
        <NavbarToggler onClick={toggle}></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {checkAuth ? (
              <Fragment>
                <NavLink href="/">
                  <span style={{ color: "#dddddd" }}>
                    <FontAwesomeIcon icon={faHome} /> หน้าหลัก
                  </span>
                </NavLink>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span style={{ color: "#dddddd" }}>
                      <FontAwesomeIcon icon={faUser} />
                      {nameUser
                        ? ` ${nameUser.title}${nameUser.firstname} ${nameUser.lastname}`
                        : ""}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link to="/users">
                      <DropdownItem>ข้อมูลส่วนตัว</DropdownItem>
                    </Link>
                    <Link to="/">
                      <DropdownItem divider />
                      <Logout />
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink href="/">
                  <span style={{ color: "#dddddd" }}>
                    <FontAwesomeIcon icon={faHome} /> หน้าหลัก
                  </span>
                </NavLink>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span style={{ color: "#dddddd" }}>
                      <FontAwesomeIcon icon={faList} /> เมนู
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link
                      target="_blank"
                      to={{
                        pathname:
                          "https://drive.google.com/file/d/1sUrsxEaoc_hPRHtklcw_DT2V3g1tUSFR/view?usp=sharing",
                      }}
                    >
                      <DropdownItem>คู่มือการใช้งาน</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link
                      target="_blank"
                      to={{
                        pathname:
                          "https://docs.google.com/forms/d/1tbjiWIM5TL8K-c90AllvmfpgnJTLp1AE5j7bdzJmj84/edit?usp=sharing",
                      }}
                    >
                      <DropdownItem>
                        แจ้งร้องเรียน
                        <br />
                        (สำหรับบุคคลภายนอก)
                      </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem>
                      <RegisterModal />
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default connect(null, { clearErrors, loadUser })(AppNavbar);
