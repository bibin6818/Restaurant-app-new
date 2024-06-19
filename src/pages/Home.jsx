import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/slice/productSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import '../../src/index.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 4;

  const { allProducts, error, loading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(allProducts.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allProducts.length / itemsPerPage); i++) {
      pageNumbers.push(
        <Button key={i} onClick={() => paginate(i)} variant={currentPage === i ? 'primary' : 'secondary'}>
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setModalShow(true);
  };

  const handleViewMore = (id) => {
    navigate(`/${id}/view`);
  };

  const renderHours = (hours) => {
    return (
      <ul>
        {Object.entries(hours).map(([day, time]) => (
          <li key={day}><strong>{day}:</strong> {time}</li>
        ))}
      </ul>
    );
  };

  const renderModal = () => (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'black' }} id="contained-modal-title-vcenter">
          {selectedProduct?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Operating Hours</h3>
        {selectedProduct?.operating_hours ? renderHours(selectedProduct.operating_hours) : null}
        <h5>Address</h5>
        <p>{selectedProduct?.address}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:'black'}} onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Header insideHome={true} />
      <div className="mx-3" style={{ marginTop: "200px" }}>
        {loading ? (
          <div className="text-center mt-5 fw-bolder">
            <Spinner className="me-2" animation="border" variant="danger" />{" "}
            Loading...
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15rem', margin: '5rem auto', maxWidth: '1200px' }}>
              {currentProducts.map(product => (
                <Card className='card-body' key={product.id} style={{ width: '30rem' }}>
                  <Card.Img className="card-img" style={{ height: '400px' }} variant="top" src={product.photograph} onClick={() => handleCardClick(product)} />
                  <Card.Body style={{ height: '30px' }}>
                    <Card.Title className='card-title'>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ width: '130px', justifyContent: 'center' }} variant="primary" onClick={() => handleViewMore(product.id)}> View More</Button>
                  </div>
                </Card>
              ))}
            </div>
            <br /><br /><br />
            <div className='pagination' style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}>
              {renderPagination()}
            </div>
            {renderModal()}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
