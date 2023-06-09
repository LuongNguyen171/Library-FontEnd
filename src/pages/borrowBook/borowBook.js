

import React, { useState } from 'react';

import axios from 'axios';

import Modal from 'react-modal';

import './borrowBook.css';




function BorrowBookForm() {

  const [memberId, setMemberId] = useState('');

  const [bookIds, setBookIds] = useState([]);

  const [dateBorrow, setDateBorrow] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [errorModalVisible, setErrorModalVisible] = useState(false);




  const handleBorrowBook = () => {

    if (!memberId || bookIds.length === 0) {

      setErrorModalVisible(true);

      return;

    }


    setShowModal(true);

  };




  const handleConfirmBorrow = () => {

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdXlAZ21haWwuY29tIiwiaWF0IjoxNjg2Mjc3ODA5LCJleHAiOjE2ODYzNjQyMDl9.xeWZhXOcA71rcAit1zHLlvH7oDDvWJZMcXS4j34RkwE';




    const borrowPromises = bookIds.map(bookId =>

      axios.post(

        'http://localhost:8080/api/v1/memberbook/add',

        {

          memberId,

          bookId,

          dateBorrow

        },

        {

          headers: {

            'Authorization': `Bearer ${token}`

          }

        }

      )

    );




    Promise.all(borrowPromises)

      .then(responses => {

        console.log(responses);

        setShowModal(false);

        setMemberId('');

        setBookIds([]);

        setDateBorrow('');

      })

      .catch(error => {

        console.error(error);

        setShowModal(false);

        setErrorModalVisible(true);

      });

  };




  const handleAddBookId = () => {

    setBookIds([...bookIds, '']);

  };




  const handleBookIdChange = (index, value) => {

    const updatedBookIds = [...bookIds];

    updatedBookIds[index] = value;

    setBookIds(updatedBookIds);

  };




  return (

    <div className="borrow-book-form">

      <h2>Borrow Book</h2>

      <div className="form-group">

        <label htmlFor="memberId">Member ID:</label>

        <input type="text" id="memberId" value={memberId} onChange={e => setMemberId(e.target.value)} />

      </div>

      {bookIds.map((bookId, index) => (

        <div className="form-group" key={index}>

          <label htmlFor={`bookId-${index}`}>Book ID:</label>

          <input

            type="text"

            id={`bookId-${index}`}

            value={bookId}

            onChange={e => handleBookIdChange(index, e.target.value)}

          />

        </div>

      ))}

      <button className="btn-add" onClick={handleAddBookId}>Add Book</button>

      <div className="form-group">

        <label htmlFor="dateBorrow">Date Borrow:</label>

        <input type="date" id="dateBorrow" value={dateBorrow} onChange={e => setDateBorrow(e.target.value)} />

      </div>

      <button className="btn-borrow" onClick={handleBorrowBook}>Borrow</button>




      <Modal

        isOpen={showModal}

        onRequestClose={() => setShowModal(false)}

        contentLabel="Confirm Borrow"
        className="modal"

      >

        <h3>Confirm Borrow</h3>

        <p>Are you sure you want to borrow these books?</p>

        <ul>

          {bookIds.map((bookId, index) => (

            <li key={index}>{bookId}</li>

          ))}

        </ul>

        <button onClick={handleConfirmBorrow}>Yes</button>

        <button onClick={() => setShowModal(false)}>No</button>

      </Modal>




      {errorModalVisible && <p>Error message!</p>}

    </div>

  );

}




export default BorrowBookForm;



