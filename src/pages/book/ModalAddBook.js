import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const ModalAddBook = (props) => {
  const [bookInfo, setBookInfo] = useState({
    bookName: '',

    bookAuthor: '',

    bookPublisher: '',

    bookPublishYear: '',

    bookQuantity: 1,

    bookPrice: 0,

    bookPriceBorrow: 0,

    bookEdition: 1,

    bookStatus: true,

    bookType: {
      typeId: 1,

      typeName: 'Văn học - Nghệ thuật',
    },
  });

  const toggle = () => {
    props.toggleModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'bookType') {
      const selectedOption = event.target.selectedOptions[0];

      const typeId = parseInt(selectedOption.value);

      const typeName = selectedOption.text;

      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,

        bookType: { typeId, typeName },
      }));
    } else if (name === 'bookStatus') {
      const boolValue = JSON.parse(value);

      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,

        [name]: boolValue,
      }));
    } else if (name === 'bookQuantity' || name === 'bookPublishYear' || name === 'bookEdition') {
      const numberValue = parseInt(value);

      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,

        [name]: numberValue,
      }));
    } else if (name === 'bookPrice' || name === 'bookPriceBorrow') {
      const numberValue = parseFloat(value);

      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,

        [name]: numberValue,
      }));
    } else {
      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,

        [name]: value,
      }));
    }
  };

  const handleAddBook = () => {
    props.createNewBook(bookInfo);
    toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Thêm sách mới</ModalHeader>

      <ModalBody>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bookName">Tên sách</Label>

                <Input type="text" name="bookName" id="bookName" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="bookAuthor">Tác giả</Label>

                <Input type="text" name="bookAuthor" id="bookAuthor" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bookPublisher">Nhà xuất bản</Label>

                <Input type="text" name="bookPublisher" id="bookPublisher" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for="bookPublishYear">Năm xuất bản</Label>

                <Input type="text" name="bookPublishYear" id="bookPublishYear" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for="bookQuantity">Số lượng</Label>

                <Input type="number" name="bookQuantity" id="bookQuantity" min="1" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="bookType">Thể loại</Label>

                <Input type="select" name="bookType" id="bookType" onChange={handleInputChange}>
                  <option value="1">Văn học - Nghệ thuật</option>
                  <option value="2">Khoa học - Công nghệ</option>
                  <option value="3">Thiếu nhi</option>
                  <option value="4">Chính trị - Xã hội</option>
                  <option value="5">Quản lý - Kinh tế</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="bookStatus">Tình trạng sách</Label>

                <div>
                  <Label check>
                    <Input type="radio" id="bookStatus" name="bookStatus" value="true" defaultChecked={true} onChange={handleInputChange} /> Mới
                  </Label>
                </div>

                <div>
                  <Label check>
                    <Input type="radio" id="bookStatus" name="bookStatus" value="false" onChange={handleInputChange} /> Cũ
                  </Label>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="bookPrice">Giá sách</Label>

                <Input type="text" name="bookPrice" id="bookPrice" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="bookPriceBorrow">Giá mượn sách</Label>

                <Input type="text" name="bookPriceBorrow" id="bookPriceBorrow" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="bookEdition">Lần tái bản</Label>

                <Input type="number" name="bookEdition" id="bookEdition" min="1" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handleAddBook}>
          Thêm sách
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAddBook;
