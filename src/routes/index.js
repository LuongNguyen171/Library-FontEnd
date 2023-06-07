// import Member from "../pages/member/member";
import BorrowBook from "../pages/borrowBook/borowBook";
import Book from "../pages/book/book";
import ReturnBook from "../pages/returnBook";
import Login from "../pages/login";
import Home from "../component/home";
import LoginLayout from "../component/LoginLayout";
const publicRoutes = [
  { path: "/", component: Login , layout: LoginLayout},
  { path: "/login", component: Login , layout: LoginLayout },
  { path: "/home", component: Home  },
  { path: "/book", component: Book },
  { path: "/borrowBook", component: BorrowBook },
  { path: "/returnBook", component: ReturnBook },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
