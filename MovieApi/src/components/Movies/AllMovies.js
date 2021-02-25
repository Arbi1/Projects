import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
  Button,
  Progress,
} from "reactstrap";
import MovieCard from "./MovieCard";

const AllMovies = (props) => {
  return (
    <div>
      <h1 className="text-center mt-5 mb-5">Serialet e fundit</h1>
      <MovieCard />
    </div>
  );
};

export default AllMovies;
