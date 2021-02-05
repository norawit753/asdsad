import React, { Fragment } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import image from "../../images/PicComplaint.png";
import { auth_user } from "../../actions/complaint/authAction";

const CardComplaint = (props) => {
  const auth = useSelector((state) => state.main.auth.user);
  const dispatch = useDispatch();

  const imgStyle = {
    maxWidth: 300,
  };

  CardComplaint.prototypes = {
    auth_user: PropTypes.func.isRequired,
  };
  const { auth_user } = props;

  const onClick = async (e) => {
    e.preventDefault();
    const newUserComplaint = await {
      buasri_id: auth.buasri_id,
    };
    await auth_user(newUserComplaint);
    await dispatch({ type: "PAGE_LOADING" });
    await props.history.push("/complaint");
  };

  return (
    <Fragment>
      <Card>
        <CardImg
          top
          className="align-self-center"
          width="100%"
          src={image}
          style={imgStyle}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>
            <h4>Complaint</h4>
          </CardTitle>
          <CardText>
            แจ้งร้องเรียน - แจ้งร้องเรียนปัญหาต่าง ๆ ภายในคณะวิทยาศาสตร์
          </CardText>
          {auth ? (
            <Fragment>
              <Button color="dark" onClick={onClick} block>
                เข้าใช้งาน
              </Button>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withRouter(connect(null, { auth_user })(CardComplaint));
