import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { withRouter } from "react-router";
import axios from "axios";
import _ from "lodash";
import { processDate } from "../utils/processDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../history";

class Employee extends Component {
  state = {
    employee: {},
    error: {},
  };
  componentDidMount() {
    if (!this.props.location.state) {
      this.setState({ error: { response: "No data" } });
      return;
    }
    const id = this.props.location.pathname.split("/")[1];
    const theDate = processDate(this.props.location.state.date);

    axios
      .get(`http://localhost:5000/api/v1/employees/${id}?date=${theDate}`)
      .then((response) => {
        this.setState({ employee: response.data.data, error: {} });
      })
      .catch((err) => {
        this.setState({ employee: {}, error: err.response });
      });
    console.log(this.props.location);
  }

  handleDelete = () => {
    const id = this.props.location.pathname.split("/")[1];
    const theDate = processDate(this.props.location.state.date);
    axios
      .delete(`http://localhost:5000/api/v1/employees/${id}?date=${theDate}`, {
        deleteDate: theDate,
      })
      .then((response) => {
        toast.success("Employee deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  render() {
    return (
      <div className="card p-5">
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
        {!_.isEmpty(this.state.employee) && _.isEmpty(this.state.error) ? (
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Pay per Hour</th>
                <th>Start Date</th>
                <th>Work hours</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.employee.firstName}</td>
                <td>{this.state.employee.lastName}</td>
                <td>{this.state.employee.position}</td>
                <td>{this.state.employee.payPerHour}</td>
                <td>{this.state.employee.startDate.split("T")[0]}</td>
                <td>{this.state.employee.workHours}</td>
                <td>{this.state.employee.salary}</td>
                <td>
                  <Button onClick={this.handleDelete}>Delete</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <h1>No data to show</h1>
        )}
      </div>
    );
  }
}

export default withRouter(Employee);
