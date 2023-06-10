import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
const ModalUpdateBook = (props) => {
  const [updateBook, setUpdateBook] = useState({
    bookName: '',
    bookAuthor: '',
    bookPublisher: '',
    bookPublishYear: '',
    bookQuantity: '',
    bookPrice: '',
    bookPriceBorrow: '',
    bookEdition: '',
    bookStatus: '',
    bookType: {
      typeId: '',
      typeName: '',
    },
  });

  useEffect(() => {
    setUpdateBook(props.currentBook);
  }, [props.currentBook]);

  const toggle = () => {
    props.toggleModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'bookType') {
      const selectedOption = event.target.selectedOptions[0];
      const typeId = parseInt(selectedOption.value);
      const typeName = selectedOption.text;

      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        bookType: { typeId, typeName },
      }));
    } else if (name === 'bookStatus') {
      const boolValue = JSON.parse(value);
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: boolValue,
      }));
    } else if (name === 'bookQuantity' || name === 'bookPublishYear' || name === 'bookEdition') {
      const numberValue = parseInt(value);
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: numberValue,
      }));
    } else if (name === 'bookPrice' || name === 'bookPriceBorrow') {
      const numberValue = parseFloat(value);
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: numberValue,
      }));
    } else {
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: value,
      }));
    }
  };

  const handleSaveBook = () => {
    props.updateBook(updateBook);
    toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Cập nhật sách</ModalHeader>
      <ModalBody>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bookName">Tên sách</Label>
                <Input type="text" name="bookName" id="bookName" value={updateBook.bookName} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="bookAuthor">Tác giả</Label>
                <Input type="text" name="bookAuthor" id="bookAuthor" value={updateBook.bookAuthor} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bookPublisher">Nhà xuất bản</Label>
                <Input type="text" name="bookPublisher" id="bookPublisher" value={updateBook.bookPublisher} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="bookPublishYear">Năm xuất bản</Label>
                <Input type="text" name="bookPublishYear" id="bookPublishYear" value={updateBook.bookPublishYear} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="bookQuantity">Số lượng</Label>
                <Input type="number" name="bookQuantity" id="bookQuantity" min="1" value={updateBook.bookQuantity} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bookType">Thể loại</Label>
                <Input type="select" name="bookType" id="bookType" onChange={handleInputChange}>
                  {props.currentBook.bookType?.typeId === 1 && (
                    <>
                      <option value="1">Văn học - Nghệ thuật</option>
                      <option value="2">Khoa học - Công nghệ</option>
                      <option value="3">Thiếu nhi</option>
                      <option value="4">Chính trị - Xã hội</option>
                      <option value="5">Quản lý - Kinh tế</option>
                    </>
                  )}
                  {props.currentBook.bookType?.typeId === 2 && (
                    <>
                      <option value="2">Khoa học - Công nghệ</option>
                      <option value="1">Văn học - Nghệ thuật</option>
                      <option value="3">Thiếu nhi</option>
                      <option value="4">Chính trị - Xã hội</option>
                      <option value="5">Quản lý - Kinh tế</option>
                    </>
                  )}
                  {props.currentBook.bookType?.typeId === 3 && (
                    <>
                      <option value="3">Thiếu nhi</option>
                      <option value="1">Văn học - Nghệ thuật</option>
                      <option value="2">Khoa học - Công nghệ</option>
                      <option value="4">Chính trị - Xã hội</option>
                      <option value="5">Quản lý - Kinh tế</option>
                    </>
                  )}
                  {props.currentBook.bookType?.typeId === 4 && (
                    <>
                      <option value="4">Chính trị - Xã hội</option>
                      <option value="1">Văn học - Nghệ thuật</option>
                      <option value="2">Khoa học - Công nghệ</option>
                      <option value="3">Thiếu nhi</option>
                      <option value="5">Quản lý - Kinh tế</option>
                    </>
                  )}
                  {props.currentBook.bookType?.typeId === 5 && (
                    <>
                      <option value="5">Quản lý - Kinh tế</option>
                      <option value="1">Văn học - Nghệ thuật</option>
                      <option value="2">Khoa học - Công nghệ</option>
                      <option value="3">Thiếu nhi</option>
                      <option value="4">Chính trị - Xã hội</option>
                    </>
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="bookStatus">Tình trạng sách</Label>
                <div>
                  <Label check>
                    <Input
                      type="radio"
                      id="bookStatus"
                      name="bookStatus"
                      value={'true'}
                      defaultChecked={true && props.currentBook.bookStatus}
                      onChange={handleInputChange}
                    />{' '}
                    Mới
                  </Label>
                </div>
                <div>
                  <Label check>
                    <Input
                      type="radio"
                      id="bookStatus"
                      name="bookStatus"
                      value={'false'}
                      defaultChecked={true && !props.currentBook.bookStatus}
                      onChange={handleInputChange}
                    />{' '}
                    Cũ
                  </Label>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="bookPrice">Giá sách</Label>
                <Input type="text" name="bookPrice" id="bookPrice" value={updateBook.bookPrice} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="bookPriceBorrow">Giá mượn sách</Label>
                <Input type="text" name="bookPriceBorrow" id="bookPriceBorrow" value={updateBook.bookPriceBorrow} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="bookEdition">Lần tái bản</Label>
                <Input type="number" name="bookEdition" id="bookEdition" min="1" value={updateBook.bookEdition} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSaveBook}>
          Lưu
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalUpdateBook;
