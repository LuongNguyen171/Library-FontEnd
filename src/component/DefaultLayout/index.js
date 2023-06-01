import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Navbar from "./Navbar/navbar";
import Header from "./Header/header";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("layout-default")}>
        <Header className={cx("header")} />
        <div className={cx("body")}>
          <Navbar></Navbar>
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
