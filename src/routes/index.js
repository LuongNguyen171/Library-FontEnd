import Member from "../pages/member/member";
import BorrowBook from "../pages/borrowBook/borowBook";
import Book from "../pages/book/book";
import ReturnBook from "../pages/returnBook";
const publicRoutes = [
  { path: "/", component: Member },
  { path: "/book", component: Book },
  { path: "/borrowBook", component: BorrowBook },
  { path: "/returnBook", component: ReturnBook },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
