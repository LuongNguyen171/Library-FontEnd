import classNames from 'classnames/bind';

import styles from './book.module.scss';

import React, { useEffect, useState } from 'react';

import ModalAddBook from './ModalAddBook';

import ModalUpdateBook from './ModalUpdateBook';
import {FaRegEdit} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import {GrAdd} from 'react-icons/gr'

import { getAllBooksAPI, addNewBookAPI, deleteBookAPI, updateBookAPI } from '../../api/bookApi';

const cx = classNames.bind(styles);




const Book = () => {

  const [books, setBooks] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [bookEdit, setBookEdit] = useState({});




  const getAllBooks = async () => {

    let response = await getAllBooksAPI();

    if (response && response.status === 200) {

      setBooks(response.data);

    }

  };




  useEffect(() => {

    getAllBooks();

  }, []);




  const toggleAddModal = () => {

    setShowAddModal(!showAddModal);

  };




  const toggleUpdateModal = () => {

    setShowUpdateModal(!showUpdateModal);

  };




  const createNewBook = async (data) => {

    try {

      let response = await addNewBookAPI(data);

      if (response && response.status === 200) {

        await getAllBooks();

        setShowAddModal(false);

      }

    } catch (error) {

      console.log(error);

    }

  };




  const handleDeleteBook = async (book) => {

    try {
      alert(1)

      let response = await deleteBookAPI(book.bookId);

      if (response && response.status === 200) {

        await getAllBooks();

      }

    } catch (error) {

      console.log(error);

    }

  };




  const handleUpdateBook = (book) => {

    setShowUpdateModal(true);

    setBookEdit(book);

  };




  return (

    <div className={cx('book-container')}>

      <ModalAddBook isOpen={showAddModal} toggleModal={toggleAddModal} createNewBook={createNewBook} />

      <ModalUpdateBook isOpen={showUpdateModal} toggleModal={toggleUpdateModal} currentBook={bookEdit} />

      <div className={cx('title')}>Quản lý sách</div>

      <div className={cx('btn-add')}>

        <button className={cx('btn', 'btn-primary')} onClick={toggleAddModal}>
          <GrAdd/>

          {/* <i className="fa-solid fa-plus"></i> */}

          Thêm sách

        </button>

      </div>

      <table className={cx('book-table')}>

        <tbody>

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
                    <FaRegEdit onClick={() => handleUpdateBook(book)}/>
                    <AiFillDelete onClick={() => handleDeleteBook(book)}/>

                    {/* <i onClick={() => handleUpdateBook(book)} className={cx('fa-solid', 'fa-pen-to-square', 'icon-edit')}></i>

                    <i onClick={() => handleDeleteBook(book)} className={cx('fa-sharp', 'fa-solid', 'fa-trash', 'icon-delete')}></i> */}

                  </td>

                </tr>

              );

            })}

        </tbody>

      </table>

    </div>

  );

};




export default Book;