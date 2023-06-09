import axios from "axios";

const getBooks = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/books/list",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdXlAZ21haWwuY29tIiwiaWF0IjoxNjg2MjgwNzYzLCJleHAiOjE2ODYzNjcxNjN9.5gNlaZvaVkvoSaUkRPdm0V_COF4oMijBvFiSxp79SX8`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
    // setMembers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};
export default getBooks;
