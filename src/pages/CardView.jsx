import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

const View = () => {
  const { id } = useParams();
  const [activeButton, setActiveButton] = useState("What You Get");
  const showOverview = () => {
    setActiveButton("Overview");
  };

  const showImpact = () => {
    setActiveButton("Impact");
  };

  const showWhatYouGet = () => {
    setActiveButton("What You Get");
  };

  const [resturant, setResturant] = useState();

  useEffect(() => {
    if (localStorage.getItem("allProducts")) {
      const foundResturant = JSON.parse(localStorage.getItem("allProducts"));

      setResturant(foundResturant.find((item) => item.id == id));
    }
  }, []);

  if (!resturant) {
    return <div>Loading...</div>;
  }

  const getContent = () => {
    switch (activeButton) {
      case "What You Get":
        return (
          resturant && (
            <div
              style={{ maxHeight: "500px", overflowY: "auto" }}
              className="my-5"
            >
              {resturant.reviews?.length ? (
                resturant.reviews.map((review, index) => (
                  <div key={index} className=" text-white p-2 mb-2">
                    <Card className=" text-white border">
                      <Card.Body>
                        <p className="text-justify">
                          <strong>{review.name}:</strong> {review.comments}
                        </p>
                        <p>
                          <strong>Rating:</strong> {review.rating}
                        </p>
                        <p>
                          <strong>Dated:</strong> {review.date}
                        </p>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          )
        );

      case "Overview":
        return (
          <ul className="text-decoration-none list-style-none py-5 border rounded-5 mt-5">
            {Object.entries(resturant.operating_hours).map(([day, hours]) => (
              <li className="text-decoration-none list-style-none" key={day}>
                <strong>{day}:</strong> {hours}
              </li>
            ))}
          </ul>
        );
      case "Impact":
        return (
          resturant && (
            <iframe
              className="mt-5 border rounded-5"
              title="Restaurant Location"
              src={`https://maps.google.com/maps?q=${resturant.latlng.lat},${resturant.latlng.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div
        className="container container-fluid d-flex justify-content-center align-items-top text-white"
        style={{ marginTop: "80px" }}
      >
        <div className="row align-items-top my-5">
          <div className="col-lg-6 p-lg-5 mt-5 shadow">
            <img
              width={"100%"}
             
              className="rounded"
              src={resturant.photograph}
              alt=""
            />
          </div>
          <div className="col-lg-6 p-lg-5 mt-5 shadow">
            <h6>Restuarant no: {resturant.id}</h6>
            <h1>Name: {resturant.name}</h1>
            <h6>Type: {resturant.cuisine_type}</h6>
            <h6>City: {resturant.neighborhood}</h6>
            <h6>Address: {resturant.address}</h6>
            <div
              className="btn-group mt-5 text-white"
              role="group"
              aria-label="Content Toggle Buttons"
            >
              <button
                type="button"
                className="btn border btn-white text-white"
                onClick={showWhatYouGet}
              >
                Reviews
              </button>
              <button
                type="button"
                className="btn border btn-white text-white"
                onClick={showOverview}
              >
                Timings
              </button>
              <button
                type="button"
                className="btn border btn-white text-white"
                onClick={showImpact}
              >
                Direction
              </button>
            </div>
            <div id="contentDisplay">{getContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;