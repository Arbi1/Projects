import React, { useEffect, useState } from "react";
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
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { history } from "../../history";
import { Tab } from "bootstrap";
import _ from "lodash";
import { addToFavorites } from "../../utils/addToFavorites";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Movie = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(async () => {
    try {
      const theMovie = await axios.get(
        "http://api.tvmaze.com/shows/" + window.location.href.split("/")[3]
      );
      setMovie(theMovie.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="card mb-3">
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
      {!_.isEmpty(movie) ? (
        <div class="row no-gutters">
          <div class="col-sm-4">
            <img
              class="card-img-top p-5"
              src={!_.isEmpty(movie.image) ? movie.image.medium : null}
              alt="Generic placeholder image"
            />
          </div>
          <div class="col-md-8">
            <div className="card-body p-5">
              <h1 className="card-title">{movie.name}</h1>

              <div className="card-text pt-5">
                <Media heading>{movie.type}</Media>
                {ReactHtmlParser(movie.summary)}
                {movie.genres.length !== 0 ? (
                  <div>
                    <b>Genres: </b>
                    <span>{movie.genres.toString()}</span>
                  </div>
                ) : null}
                <Button
                  className="align-button-right"
                  color="warning"
                  size="sm"
                  onClick={async () => {
                    const value = await addToFavorites(movie.id);
                    console.log(value);
                    if (value === 1) {
                      toast.success("Item successfully added to favorites! ", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Movie;
