import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

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
    const token = window.localStorage.getItem("token");
    console.log(token)
  // const token  = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVvY0BnbWFpbC5jb20iLCJpYXQiOjE2ODYyOTU5NzcsImV4cCI6MTY4NjM4MjM3N30.n_MP0kHIiu5ZGPxFEY7WoL6TdKK5seMNrrG6uklLX9o'
    
    const borrowPromises = bookIds.map((bookId) =>
      axios.post(
        'http://localhost:8080/api/v1/memberbook/add',
        {
          memberId,
          bookId,
          dateBorrow,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    Promise.all(borrowPromises)
      .then((responses) => {
        console.log(responses);
        setShowModal(false);
        setMemberId('');
        setBookIds([]);
        setDateBorrow('');
      })
      .catch((error) => {
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
   <div className='wrapperborrow'>
     <div className="borrow-book-form">
      <h2>Borrow Book</h2>
      <div className="form-group">
        <label htmlFor="memberId">Member ID:</label>
        <input
          type="text"
          id="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>
      {bookIds.map((bookId, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`bookId-${index}`}>Book ID:</label>
          <input
            type="text"
            id={`bookId-${index}`}
            value={bookId}
            onChange={(e) => handleBookIdChange(index, e.target.value)}
          />
        </div>
      ))}
      <button className="btn-add" onClick={handleAddBookId}>
        Add Book
      </button>
      <div className="form-group">
        <label htmlFor="dateBorrow">Date Borrow:</label>
        <input
          type="date"
          id="dateBorrow"
          value={dateBorrow}
          onChange={(e) => setDateBorrow(e.target.value)}
        />
      </div>
      <button className="btn-borrow" onClick={handleBorrowBook}>
        Borrow
      </button>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Borrow</h3>
            <p>Are you sure you want to borrow these books?</p>
            <div className="modal-actions">
              <button className="btn-confirm" onClick={handleConfirmBorrow}>
                Confirm
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error modal */}
      {errorModalVisible && (
        <div className="modal-overlay error">
          <div className="modal-content error">
            <h3>Error</h3>
            <p>Please enter a member ID and select at least one book to borrow.</p>
            <button
              className="btn-close"
              onClick={() => setErrorModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
   </div>
  );
}

export default BorrowBookForm;
