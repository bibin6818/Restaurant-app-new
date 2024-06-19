import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchProducts } from "../Redux/slice/productSlice";
import '../../src/index.css'

const Header = ({ insideHome }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-dark">
      <Navbar className="navbar" fixed="top" expand="lg">
        <Container>
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            className="fw-bold py-2"
          >
            <Navbar.Brand style={{ color: "black" }}>
              <img style={{height:'50px',width:'50px'}} src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" /> <h5>Restaurant-Website</h5>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                {insideHome && (
                  <div className="d-flex mx-auto" style={{ width: "300%" }}>
                    <Form.Control
                      type="search"
                      placeholder="Search Resturant City"
                      className="rounded p-1 border border-black"
                      onChange={(e) =>
                        dispatch(searchProducts(e.target.value.toLowerCase()))
                      }
                    />
                  </div>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;