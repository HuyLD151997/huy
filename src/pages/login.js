import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import * as authenticateActions from "./../actions/authentication/authentication";
import { useDispatch } from "react-redux";
import { useLocation, withRouter } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import img from "../img/32x32.png";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  // const { username, password } = input;
  const dispatch = useDispatch();

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setInput((inputs) => ({ ...inputs, [name]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (username && password) {
  //     dispatch(authenticateActions.login(password, username));
  //   }
  // };

  const validationSchema = yup
    .object({
      username: yup.string().required("Tài khoản không được để trống!"),
      password: yup.string().required("Mật khẩu không được để trống!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitForm = async (data) => {
    console.log(data);
    try {
      await dispatch(authenticateActions.login(data.password, data.username));

      // console.log("hello");
    } catch (er) {
      console.log(er);
      Swal.fire({
        icon: "error",
        text: "tạo thất bại",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    localStorage.clear();
  });

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-5 m-auto mt-5">
          <form
            onSubmit={handleSubmit(submitForm)}
            style={{ borderColor: "#fdcb08" }}
          >
            {/* <img
              id="logoLogin"
              src="data:image/jpeg;base64,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"
            /> */}
            <img
              src={img}
              style={{
                marginLeft: "180px",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            />
            <div
              className="form-group"
              style={{
                margin: "20px",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Tên tài khoản"
                {...register("username")}
                style={{ width: "300px", marginLeft: "45px" }}
              />
              <p className="text-danger">{errors.username?.message}</p>
            </div>
            <div className="form-group" style={{ margin: "20px" }}>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                name="password"
                {...register("password")}
                style={{ width: "300px", marginLeft: "45px" }}
              />
              <p className="text-danger">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#fdcb08",
                width: "300px",
                marginLeft: "65px",
                marginBottom: "50px",
              }}
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
