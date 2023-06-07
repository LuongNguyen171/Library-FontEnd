import classNames from 'classnames/bind';
import styles from './book.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

const Book = () => {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaG9uZ0BnbWFpbC5jb20iLCJpYXQiOjE2ODYxMzQ0OTQsImV4cCI6MTY4NjIyMDg5NH0.6lEdlh_-Bz7QBTYe0vawFY8dHiMnrLcvf7hxiA1Ne4E';
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookInfo, setBookInfo] = useState({
    bookName: '',
    bookAuthor: '',
    bookPublisher: '',
    bookPublishYear: 0,
    bookQuantity: 0,
    bookPrice: 0,
    bookPriceBorrow: 0,
    bookEdition: 0,
    bookStatus: true,
    bookType: {
      typeId: 0,
      typeName: '',
    },
    // Các thông tin sách khác
  });
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/books/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddBook = () => {
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  return (
    <div className={cx('book-container')}>
      <div className={cx('title')}>Quản lý sách</div>
      <div className={cx('btn-add')}>
        <button className={cx('btn', 'btn-primary')} onClick={handleAddBook}>
          <i class="fa-solid fa-plus"></i>
          Thêm sách
        </button>
      </div>
      <table className={cx('book-table')}>
        <tr>
          <th>Id</th>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Thể loại</th>
          <th>Nhà xuất bản</th>
          <th>Giá mượn sách</th>
          <th>Actions</th>
        </tr>

        {books &&
          books.map((book, index) => {
            return (
              <tr key={index}>
                <td>{book.bookId}</td>
                <td>{book.bookName}</td>
                <td>{book.bookAuthor}</td>
                <td>{book.bookType.typeName}</td>
                <td>{book.bookPublisher}</td>
                <td>{book.bookPriceBorrow}</td>
                <td className={cx('icon')}>
                  <i className={cx('fa-solid', 'fa-pen-to-square', 'icon-edit')}></i>
                  <i className={cx('fa-sharp', 'fa-solid', 'fa-trash', 'icon-delete')}></i>
                </td>
              </tr>
            );
          })}
      </table>
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm sách</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Tên sách:</label>
                    <input type="text" name="bookName" value={bookInfo.bookName} onChange={handleInputChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Tác giả:</label>
                    <input type="text" name="bookAuthor" value={bookInfo.bookAuthor} onChange={handleInputChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Nhà xuất bản:</label>
                    <input type="text" name="bookPublisher" value={bookInfo.bookPublisher} onChange={handleInputChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Năm xuất bản:</label>
                    <input
                      type="text"
                      name="bookPublishYear"
                      value={bookInfo.bookPublishYear}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    <label>Số lượng:</label>
                    <input type="number" name="bookQuantity" value={bookInfo.bookQuantity} onChange={handleInputChange} className="form-control" />
                  </div>
                  {/* <div className="form-group">
                    <label>Số lượng:</label>
                    <input type="number" name="bookQuantity" value={bookInfo.bookQuantity} onChange={handleInputChange} className="form-control" />
                  </div> */}
                  <div className="form-group">
                    <label>Giá sách:</label>
                    <input type="number" name="bookPrice" value={bookInfo.bookPrice} onChange={handleInputChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Giá mượn sách:</label>
                    <input
                      type="number"
                      name="bookPriceBorrow"
                      value={bookInfo.bookPriceBorrow}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Lần xuất bản:</label>
                    <input type="number" name="bookEdition" value={bookInfo.bookEdition} onChange={handleInputChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Tình trạng sách</label>
                    <input type="radio" name="bookEdition" value={bookInfo.bookStatus} onChange={handleInputChange} className="form-control" />
                    <label for="html">Mới</label>
                    <input type="radio" name="bookEdition" value={bookInfo.bookStatus} onChange={handleInputChange} className="form-control" />
                    <label for="html">Cũ</label>
                  </div>
                  <div className="form-group">
                    <label>Thể loại sách:</label>
                    <input type="number" name="bookType" value={bookInfo.bookType.typeId} onChange={handleInputChange} className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>
                  Lưu
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
