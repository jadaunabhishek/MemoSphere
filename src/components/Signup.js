import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import signUpLogo from "./Signup.jpg";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    // Check if password and confirm password match
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:4001/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
        <MDBRow>
          <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
            <MDBCol col="4" md="11">
              <img src={signUpLogo} className="img-fluid" alt="Signup" />
            </MDBCol>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <form onSubmit={handleSubmit}>
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <MDBCard className="my-5 bg-glass">
                <MDBCardBody className="p-5">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    id="name"
                    name="name"
                    onChange={onChange}
                    type="text"
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    name="email"
                    id="email"
                    onChange={onChange}
                    type="email"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    name="password"
                    id="password"
                    onChange={onChange}
                    type="password"
                    minLength={6}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Confirm Password"
                    id="cpassword"
                    name="cpassword"
                    onChange={onChange}
                    type="password"
                    minLength={6}
                    required
                  />

                  <MDBBtn className="w-100 mb-4" size="md" onClick={handleSubmit}>
                    Register
                  </MDBBtn>
                  <p className="small fw-bold mt-2 pt-1 mb-2">
                    Already a user?{" "}
                    <Link to="/login" className="link-danger">
                      Login
                    </Link>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Signup;
