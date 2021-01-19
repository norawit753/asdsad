import React from "react";
import { Row } from "reactstrap";
import CookieConsent, { Cookies } from "react-cookie-consent";

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
        <CookieConsent
          buttonClasses="btn btn-primary"
          location="bottom"
          contentClasses="text-capitalize"
          buttonText="ปิด"
        >
          ทางคณะวิทยาศาสตร์มีการใช้งานคุกกี้ (Cookies)
          เพื่อจัดการข้อมูลส่วนบุคคลและช่วยเพิ่มประสิทธิภาพการใช้งานเว็บไซต์
          ท่านสามารถศึกษารายละเอียดเพิ่มเติมและการตั้งค่าคุกกี้ได้ที่{" "}
          <a
            href="http://science.swu.ac.th/Default.aspx?tabid=20330&language=th-TH"
            target="_blank"
          >
            นโยบายการใช้คุ้กกี้
          </a>
        </CookieConsent>
      </div>
    </Row>
  );
};

export default AppFooter;
