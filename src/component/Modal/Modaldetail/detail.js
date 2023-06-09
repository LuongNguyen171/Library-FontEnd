import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./detail.module.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import img1 from "./Avtmember/img1.jpg";
import img2 from "./Avtmember/img2.jpg";
import img3 from "./Avtmember/img3.jpg";
import img4 from "./Avtmember/img4.jpg";
const cx = classNames.bind(styles);

function ModalDetail({ isShowDetail, dataMemberdetail, dataMember }) {
  const [showModal, setShowDeleteModal] = useState(false);
  const handleShowModal = () => {
    isShowDetail(false);
    console.log(dataMemberdetail);
  };
  //
  const checkDate = (time1, time2) => {
    // const date1 = new Date(time1);
    // const date2 = new Date(time2);
    if (time1 > time2) {
      return true;
    } else {
      return false;
    }
  };
  //xử lí chuỗi ảnh
  const getAvt = () => {
    // Đối tượng ánh xạ tên hình ảnh với đường dẫn
    const imagePaths = {
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
    };

    // Chuỗi tên hình ảnh
    const imageName = dataMember.memberAvt;

    // Kiểm tra xem có tồn tại đường dẫn cho tên hình ảnh hay không
    if (imageName in imagePaths) {
      const imagePath = imagePaths[imageName];
      return <img src={imagePath} />;
    } else {
      return "";
    }
  };

  return (
    <Modal
      show={handleShowModal}
      onHide={handleShowModal}
      className={cx("modal")}
      size="lg"
    >
      <div className={cx("wrapper")}>
        <div className={cx("header_modal")}>
          <h2>Thông tin thành viên</h2>
          <FontAwesomeIcon
            icon={faClose}
            className={cx("close")}
            onClick={handleShowModal}
          />
        </div>
        {}
        <div className={cx("body")}>
          <div className={cx("member_infor")}>
            <div className={cx("infor_avt")}>{getAvt()}</div>

            <div className={cx("infor_detail")}>
              <p>
                Mã số thẻ :<span>{dataMember.memberId}</span>
              </p>
              <p>
                Họ tên :<span>{dataMember.memberName}</span>
              </p>
              <p>
                Địa chỉ :<span>{dataMember.memberAddress}</span>
              </p>
              <p>
                Số điện thoại :<span>{dataMember.memberPhone}</span>
              </p>
              <p>
                Email :<span>{dataMember.memberEmail}</span>
              </p>
              <p>
                Ngày đăng kí :<span>{dataMember.memberDoB}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={cx("footer")}>
          <div className={cx("borrowing")}>
            <h3 className={cx("title")}>Đang mượn</h3>
            <Table className={cx("table")} hover size="lg">
              <thead>
                <tr>
                  <th>Tên Sách</th>
                  <th>Tác gả</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                </tr>
              </thead>
              <tbody>
                {dataMemberdetail.map((member, index) =>
                  checkDate(member.dateBorrow, member.dateReturn) ? (
                    <tr key={index}>
                      <td>{member.bookName}</td>
                      <td>{member.bookAuthor}</td>
                      <td>{member.dateBorrow}</td>
                      <td>{member.dateReturn}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </Table>
          </div>
          <div className={cx("over_time")}>
            <h3 className={cx("title")}>Quá hạn</h3>
            <Table className={cx("table")} hover size="lg">
              <thead>
                <tr>
                  <th>Tên Sách</th>
                  <th>Tác gả</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                </tr>
              </thead>
              <tbody>
                {dataMemberdetail.map((member, index) =>
                  checkDate(member.dateBorrow, member.dateReturn) == false ? (
                    <tr key={index}>
                      <td>{member.bookName}</td>
                      <td>{member.bookAuthor}</td>
                      <td>{member.dateBorrow}</td>
                      <td>{member.dateReturn}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDetail;
