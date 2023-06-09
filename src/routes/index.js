// import Member from "../pages/member/member";
import BorrowBook from "../pages/borrowBook/borowBook";
import Book from "../pages/book/book";
import ReturnBook from "../pages/returnBook";
import Login from "../pages/login";
import Home from "../component/home";
import LoginLayout from "../component/LoginLayout";
import Member from "../pages/member/member";
const publicRoutes = [
  { path: "/", component: Login , layout: LoginLayout},
  { path: "/login", component: Login , layout: LoginLayout },
  { path: "/home", component: Home  },
  { path: "/member", component: Member  },
  { path: "/book", component: Book },
  { path: "/borrowbook", component: BorrowBook },
  { path: "/returnbook", component: ReturnBook },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
