// import Member from "../pages/member/member";
import BorrowBookForm from "../component/borrowbook";
import ReturnBookForm from "../component/returnbook";
import Book from "../pages/book/book";
import Login from "../pages/login";
import Home from "../component/home";
import LoginLayout from "../component/LoginLayout";
import Member from "../pages/member/member";
import NotFoundPage from "../pages/notfound";
const publicRoutes = [
  { path: "/", component: Login , layout: LoginLayout},
  { path: "/login", component: Login , layout: LoginLayout },
  { path: "/home", component: Home  },
  { path: "/member", component: Member  },
  { path: "/book", component: Book },
  { path: "/borrowbook", component: BorrowBookForm },
  { path: "/returnbook", component:  ReturnBookForm},
  { path: "*", component:  NotFoundPage,  layout: LoginLayout},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
