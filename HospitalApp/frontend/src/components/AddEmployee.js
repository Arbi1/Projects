import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../history";

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  payPerHour: Yup.string()
    .matches(/^\d+$/, "Please enter a number")
    .required("Required"),
});

const AddEmployee = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card flex-grow-1 justify-content-center mt-5 p-2"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="card-title">Add Employee</h1>
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
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            position: "MJEK",
            payPerHour: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
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
            const body = {
              firstName: values.firstName,
              lastName: values.lastName,
              position: values.position,
              payPerHour: values.payPerHour,
              startDate: theDate,
            };

            axios
              .post("http://localhost:5000/api/v1/employees", body)
              .then((response) => {
                toast.success("Employee added successfully!", {
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
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormGroup className="form-group">
                <label htmlFor="firstName">First name</label>
                <Field
                  className={`form-control ${
                    errors.firstName && touched.firstName && "is-invalid"
                  }`}
                  name="firstName"
                  placeholder="FirstName"
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-danger">{errors.firstName}</div>
                ) : null}
              </FormGroup>

              <FormGroup>
                <label htmlFor="lastName">Last name</label>
                <Field
                  className={`form-control ${
                    errors.lastName && touched.lastName && "is-invalid"
                  }`}
                  name="lastName"
                  placeholder="Last Name"
                />
                {errors.lastName && touched.lastName ? (
                  <div className="text-danger">{errors.lastName}</div>
                ) : null}
              </FormGroup>

              <FormGroup>
                <label htmlFor="position">Position</label>
                <Field className="form-control" as="select" name="position">
                  <option value="=MJEK">MJEK</option>
                  <option value="INFERMIER">INFERMIER</option>
                  <option value="SANITAR">SANITAR</option>
                </Field>
              </FormGroup>
              <FormGroup>
                <label htmlFor="payPerHour">Pay per Hour</label>
                <Field
                  className={`form-control ${
                    errors.payPerHour && touched.payPerHour && "is-invalid"
                  }`}
                  name="payPerHour"
                  placeholder="0"
                />
                {errors.payPerHour && touched.payPerHour ? (
                  <div className="text-danger">{errors.payPerHour}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <label htmlFor="startDate">Start Date</label>
                <br />
                <DatePicker
                  className="form-control"
                  name="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </FormGroup>

              <Button className="mr-1 mb-1" color="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
