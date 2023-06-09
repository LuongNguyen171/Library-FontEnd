import classNames from "classnames/bind";
import styles from "./SidebarStyles.css";
import {BsBookHalf} from 'react-icons/bs'


const cx = classNames.bind(styles);
function Siderbar() {
  return (
    <div className={cx('sidebar-wrapper')}>
      <div className={cx('sidebar-inner')}>
        <div className={cx('head-sidebar')}>
            <BsBookHalf size={'32px'}/>
            <div className={cx('branch-name')}>LibSmart</div>
        </div>
        <nav className={cx('sidebar-content')}>
          <div className={cx('title-sidebar')}>Menu</div>
          <ul className={cx('sidebar-menu')}>
            <li className={cx('sidebar-item')}>
                <a href="/member">Quản lý thành viên</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/book">Quản lý sách</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/borrowbook">Mượn sách</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/returnbook">Trả sách</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="#">Thống kê</a>
            </li >
            <li className={cx('sidebar-item')}>
                <a href="login">Đăng xuất</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Siderbar;
