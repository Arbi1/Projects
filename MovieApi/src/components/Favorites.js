import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
  Progress,
  Table,
  Media,
  Button,
} from "reactstrap";
import _ from "lodash";
import { deleteFromFavorites } from "../utils/deleteFromFavorites";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("movie")));
  }, []);
  return (
    <div className="card p-5 mt-1">
      <Row>
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
        {favorites.length !== 0 ? (
          favorites.map((movie) => {
            return (
              <Col lg="3" md="10" sm="5" className="mb-4" key={movie.id}>
                <Card>
                  <CardImg
                    width="50%"
                    height="40%"
                    className="img-fluid"
                    src={!_.isEmpty(movie.image) ? movie.image.medium : null}
                    alt="card image cap"
                  />
                  <CardBody>
                    <h5 className="mb-3">{movie.name}</h5>
                    <Table striped>
                      <tr>
                        <td>
                          <h5>Network</h5>
                          {movie.network ? (
                            <p className="font-medium-2 mb-0">
                              {movie.network.name}
                            </p>
                          ) : (
                            <p className="font-medium-2 mb-0">Unknown</p>
                          )}
                        </td>
                        <th></th>
                        <th></th>
                        <td>
                          <h5>Country</h5>
                          {movie.network ? (
                            <p className="font-medium-2 mb-0">
                              {movie.network.country.name}
                            </p>
                          ) : (
                            <p className="font-medium-2 mb-0">Unknown</p>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td scope="row">
                          <h5>Rating</h5>
                          {movie.rating ? movie.rating.average : null}
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Premiered</h5>
                          {movie.premiered
                            ? movie.premiered.split("-")[0]
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => {
                              setFavorites(deleteFromFavorites(movie.id));
                              toast.success("Item deleted ", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                            }}
                          >
                            Delete from Favorites
                          </Button>
                        </td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        ) : (
          <h1 className="ml-5 mt-2">You haven't added any data yet</h1>
        )}
      </Row>
    </div>
  );
};

export default Favorites;
