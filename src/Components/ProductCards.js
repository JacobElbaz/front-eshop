import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "./Product";

const ProductCards = ({ products }) => {
  return (
    <>
      <Row xs={3} sm={3} md={3} lg={6} xl={6}  className="g-2">
        {Object.values(products).length > 0 ? (
          Object.values(products).map((product) => (
            <Col key={product._id}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <>
            <Col>
              <div className="card">
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "grey",
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="card">
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "grey",
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="card">
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "grey",
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="card">
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "grey",
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default ProductCards;
