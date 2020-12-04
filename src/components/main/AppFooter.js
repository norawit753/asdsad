import React from "react";
import { Row } from "reactstrap";

const AppFooter = () => {
  return (
    <Row>
      <div
        className="fixed-bottom"
        style={{
          textAlign: "center",
          verticalAlign: "middle",
          backgroundColor: "#ffcc00",
        }}
      >
        <p style={{ paddingTop: "10px" }}>
          ฝ่ายเทคโนโลยี คณะวิทยาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ
        </p>
      </div>
    </Row>
  );
};

export default AppFooter;
