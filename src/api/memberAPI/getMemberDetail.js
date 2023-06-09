import getBookByIdMember from "../memberBookAPI/getBookByMemberId";
import getBooks from "../bookAPI/getBooks";
import getMemberId from "./getMemberById";
const getMemberDetail = async (memberId) => {
  try {
    const listBookByMemberId = await getBookByIdMember(memberId);
    const getMemberById = await getMemberId(memberId);
    const listBook = await getBooks();

    if (!Array.isArray(listBookByMemberId)) {
      listBookByMemberId = [];
    }

    if (!Array.isArray(listBook)) {
      listBook = [];
    }
    const memberInfo = { ...getMemberById };

    const result = listBookByMemberId
      .filter((record) => record.memberId === memberId)
      .map((record) => {
        const book = listBook.find((book) => book.bookId === record.bookId);
        return {
          ...record,
          ...book,
        };
      });
    return result;

    // console.log(result);
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};

export default getMemberDetail;
