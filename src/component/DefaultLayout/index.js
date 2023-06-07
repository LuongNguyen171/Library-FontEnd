import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Siderbar from "./Sidebar/Sidebar";
import Header from "./Header/header";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Siderbar></Siderbar>
      <div className={cx("body")}>
        <Header/>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
