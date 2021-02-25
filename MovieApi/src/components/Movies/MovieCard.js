import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, Row, Col, Button, Table } from "reactstrap";
import axios from "axios";
import { history } from "../../history";
import _ from "lodash";
import { addToFavorites } from "../../utils/addToFavorites";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieCard = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://api.tvmaze.com/schedule?country=US")
      .then((response) => {
        const allMovies = response.data;
        const ids = [];
        for (let movie of response.data) {
          const index = ids.indexOf(movie.show.id);
          if (index > -1) {
            allMovies.splice(index, 1);
          } else {
            ids.push(movie.show.id);
          }
        }
        setMovies(allMovies);
      })
      .catch((error) => {});
  }, []);
  return (
    <div className="card p-5 mt-1">
      <Row className="justify-content-center">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {movies
          ? movies.map((movie) => {
              return (
                <Col lg="3" md="10" sm="5" className="mb-4" key={movie.id}>
                  <Card>
                    <CardImg
                      className="img-fluid"
                      src={
                        !_.isEmpty(movie.show.image)
                          ? movie.show.image.medium
                          : null
                      }
                      alt="card image cap"
                    />
                    <CardBody>
                      <h5 className="mb-3">{movie.show.name}</h5>

                      <Table striped>
                        <tr>
                          <td>
                            <h5>Network</h5>
                            {movie.show.network ? (
                              <p className="font-medium-2 mb-0">
                                {movie.show.network.name}
                              </p>
                            ) : (
                              <p className="font-medium-2 mb-0">Unknown</p>
                            )}
                          </td>

                          <td>
                            <h5>Country</h5>
                            {movie.show.network ? (
                              <p className="font-medium-2 mb-0">
                                {movie.show.network.country.name}
                              </p>
                            ) : (
                              <p className="font-medium-2 mb-0">Unknown</p>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td scope="row">
                            <h5>Rating</h5>
                            {movie.show.rating
                              ? movie.show.rating.average
                              : null}
                          </td>

                          <td>
                            <h5>Premiered</h5>
                            {movie.show.premiered.split("-")[0]}
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => history.push("/" + movie.show.id)}
                            >
                              Details
                            </Button>
                          </td>

                          <td>
                            <Button
                              color="warning"
                              size="sm"
                              onClick={async () => {
                                const value = await addToFavorites(
                                  movie.show.id
                                );
                                console.log(value);
                                if (value === 1) {
                                  toast.success(
                                    "Item successfully added to favorites! ",
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    }
                                  );
                                } else if (value === 0) {
                                  toast.error(
                                    "Item has been already added to favorites! ",
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    }
                                  );
                                } else {
                                  toast.error("Something went wrong! ", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  });
                                }
                              }}
                            >
                              Add to Favorites
                            </Button>
                          </td>
                        </tr>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
    </div>
  );
};

export default MovieCard;
