import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import { history } from "../history";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeList = (props) => {
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState();
  useEffect(() => {
    const theDate =
      (startDate.getMonth() > 8
        ? startDate.getMonth() + 1
        : "0" + (startDate.getMonth() + 1)) +
      "/" +
      (startDate.getDate() > 9
        ? startDate.getDate()
        : "0" + startDate.getDate()) +
      "/" +
      startDate.getFullYear();

    axios
      .get("http://localhost:5000/api/v1/employees?date=" + theDate)
      .then((response) => {
        setEmployees(response.data.data);
        setError(null);
      })
      .catch((err) => {
        setEmployees([]);
        setError(err.response.data.error);
      });
  }, [startDate]);
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
      <div className="d-flex flex-row d-flex justify-content-around mb-5">
        <Button
          onClick={() =>
            history.push({
              pathname: "/add",
              state: { date: startDate },
            })
          }
        >
          Add Employee
        </Button>
        <div>
          <label>Date: </label>
          <DatePicker
            className="form-control"
            name="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>

      <div>
        {employees.length > 0 && !error ? (
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.position}</td>
                    <td>
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: "/" + employee._id,
                            state: { date: startDate },
                          })
                        }
                      >
                        Look up
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h1>No data to show</h1>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
