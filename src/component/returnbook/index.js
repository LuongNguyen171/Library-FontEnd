import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function ReturnBookForm() {
  const [userId, setUserId] = useState('');
  const [bookIds, setBookIds] = useState([]);
  const [dateReturn, setDateReturn] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleReturnBook = () => {
    if (!userId || bookIds.length === 0) {
      setErrorModalVisible(true);
      return;
    }

    setShowModal(true);
  };

  const handleConfirmReturn = () => {
  const token = window.localStorage.getItem("token");
    

    const returnPromises = bookIds.map((bookId) =>
      axios.put(
        `http://localhost:8080/api/v1/memberbook/?userId=${userId}&bookId=${bookId}`,
        { dateReturn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    Promise.all(returnPromises)
      .then((responses) => {
        console.log(responses);
        setShowModal(false);
        setUserId('');
        setBookIds([]);
        setDateReturn('');

        const totalCost = responses.reduce((total, response) => {
          const price = response.data.price || 0;
          return total + price;
        }, 0);

        alert(`Total borrowing cost: ${totalCost}VND`);
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
    <div className="return-book-form">
      <h2>Return Book</h2>
      <div className="form-group">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
        <label htmlFor="dateReturn">Date Return:</label>
        <input
          type="date"
          id="dateReturn"
          value={dateReturn}
          onChange={(e) => setDateReturn(e.target.value)}
        />
      </div>
      <button className="btn-return" onClick={handleReturnBook}>
        Return
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Return</h3>
            <p>Are you sure you want to return these books?</p>
            <div className="modal-actions">
              <button className="btn-confirm" onClick={handleConfirmReturn}>
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

      {errorModalVisible && (
        <div className="modal-overlay error">
          <div className="modal-content error">
            <h3>Error</h3>
            <p>Please enter a User ID and select at least one book to return.</p>
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
  );
}

export default ReturnBookForm;
