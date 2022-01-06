import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as getProvinceActions from "../../actions/Employees/GetProvince";
import * as getWardsAndDistrics from "../../actions/Employees/GetWardAndDistric";
import * as getAccountByIdAction from "../../actions/Employees/GetEmployById";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createAccountApi } from "../../apis/Employees/createAccountEmployeeApi";
import { NavLink, Link, useParams } from "react-router-dom";
import * as getWardsAndDistrics2 from "../../actions/Employees/GetWardAndDistric2";
import { parse, isDate } from "date-fns";
import Geocode from "react-geocode";
const CreateAccount = (props) => {
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [idCity, setIDCity] = useState(-1);
  const [idWard, setIDWard] = useState(-1);
  const [idDistrict, setIDDistrict] = useState(-1);
  Geocode.setApiKey("AIzaSyBjnyL2BSaV2tCT8PGFZZmKkZQXqCDBSPs"); //Insert your Google Maps API here
  Geocode.enableDebug();

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getProvinceActions.getProvinces());
  }, []);
  const { data, dataWardAndDistrict, dataWardAndDistrict2 } = props;
  const handleGetWardAndDistric = (id, city) => {
    setCity(city);
    setIDCity(id);
    dispatchAction(getWardsAndDistrics.getWardsAndDistrics(id));
    setWard("");
    setDistrict("");
  };
  const handleGetWardAndDistric2 = (id, ward) => {
    setWard(ward);
    setIDWard(id);
    dispatchAction(getWardsAndDistrics2.getWardsAndDistrics2(id));

    setDistrict("");
  };
  const handleGetWardAndDistric3 = (id, district) => {
    setDistrict(district);
    setIDDistrict(id);
    // setLong(3);
    // setLat(2);
    console.log(city);
    console.log(ward);
    console.log(district);
  };

  const parseDateString = (value, originalValue) => {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "dd-MM-yyyy", new Date());

    return parsedDate;
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup
    .object({
      username: yup.string().required("Tên tài khoản không được để trống"),
      // phoneNumber: yup
      //   .number()
      //   .typeError("Số điện thoại phải là số")
      //   .required("Số đt không được để trống"),
      phoneNumber: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(phoneRegExp, "Số điện thoại không đúng định dạng"),
      password: yup
        .string()
        .min(6, "Mật khẩu phải lớn hơn hoặc bằng 6 kí tự")
        .required("Mật khẩu không được để trống"),
      cpassword: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "Mật khẩu xác nhận phải trùng với Mật khẩu"
        )
        .required("Mật khẩu xác nhận không được để trống"),
      fullname: yup.string().required("Họ và tên không được để trống"),
      // birthday: yup
      //   .date()
      //   .transform(parseDateString)
      //   .max(today)
      //   .required("Ngày sinh không được để trống"),
      gender: yup
        .string()
        .required("Giới tính không được để trống")
        .matches(/(nam|nữ)/, "Phải chọn nam hoặc nữ"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      address: yup.string().required("Địa chỉ không được để trống"),
      AvatarFile: yup.mixed().required("File is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateAccount = async (
    UserName,
    Password,
    Fullname,
    Gender,
    ProvinceId,
    DistrictId,
    WardId,
    Address,
    Latitude,
    Longitude,
    PhoneNumber,
    Email,
    AvatarFile
  ) => {
    try {
      await createAccountApi({
        UserName,
        Password,
        Fullname,
        Gender,
        // Birthday: "",
        ProvinceId,
        DistrictId,
        WardId,
        Address,
        Latitude,
        Longitude,
        PhoneNumber,
        Email,
        AvatarFile,
        //File,
      });
      Swal.fire({
        icon: "success",
        text: "Tạo tài khoản thành công !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/home");
    } catch (er) {
      console.log(er);
      Swal.fire({
        icon: "error",
        text: "active fail",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const submitForm = (data) => {
    var x = 0;
    var y = 0;
    var address = `${data.address}, ${district}, ${ward}, ${city}, Việt Nam`;

    Geocode.fromAddress(address).then((response) => {
      x = response.results[0].geometry.location.lat;
      y = response.results[0].geometry.location.lng;
      handleCreateAccount(
        data.username,
        data.password,
        data.fullname,
        data.gender,
        idCity,
        idWard,
        idDistrict,
        data.address,
        x,
        y,
        data.phoneNumber.toString(),
        data.email,
        //data.file
        data.AvatarFile
      );
    });

    console.log(idWard);

    // var latitude: 0;
    // var longitude: 0;
    // dispatchAction(
    //   createEmployeeAccountActions.createEmployee(
    //     data.username,
    //     data.password,
    //     data.fullname,
    //     data.gender,
    //     idCity,
    //     idDistrict,
    //     idWard,
    //     data.address,
    //     latitude,
    //     longitude,
    //     data.phoneNumber.toString(),
    //     data.email
    //   )
    // );
  };

  return (
    <div>
      <div className="container mr-5">
        <h3 className="">Đăng kí nhân viên</h3>
        <div className=" border border-warning p-4">
          <form className="border-0 row" onSubmit={handleSubmit(submitForm)}>
            <div className="">
              <div className="col">
                <div className="form-group">
                  <label>Tên tài khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("username")}
                  />
                  <p className="text-danger">{errors.username?.message}</p>
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 0123456789"
                    {...register("phoneNumber")}
                  />
                  <p className="text-danger">{errors.phoneNumber?.message}</p>
                </div>

                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>
                <div className="form-group">
                  <label>Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("cpassword")}
                  />
                  <p className="text-danger">{errors.cpassword?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    // className="form-control"
                    {...register("AvatarFile")}
                  />
                  <p className="text-danger">{errors.AvatarFile?.message}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("fullname")}
                />
                <p className="text-danger">{errors.fullname?.message}</p>
              </div>

              <div className="form-group">
                <div class="input-group" style={{ marginTop: "56px" }}>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("gender")}
                  >
                    <option selected>Giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                  </select>
                </div>
                <p className="text-danger">{errors.gender?.message}</p>
              </div>
              <div className="form-group mt-4">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              {/* <div className="form-group">
                <label>Sinh nhật</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("birthday")}
                />
                <p>{errors.birthday?.message}</p>
              </div> */}
            </div>
            <div className="form-group">
              <div className="col">
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("address")}
                  />
                  <p className="text-danger">{errors.address?.message}</p>
                </div>
                <div className="dropdown show" style={{ marginTop: "55px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    // style={{ paddingLeft: "95px", paddingRight: "95px" }}
                  >
                    {city === "" ? "Thành Phố" : city}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    style={{ marginTop: "100px" }}
                  >
                    {data ? (
                      data.length > 0 ? (
                        data.map((item, index) => (
                          <a
                            className="dropdown-item"
                            key={index}
                            onClick={() =>
                              handleGetWardAndDistric(item.id, item.description)
                            }
                            style={{ marginTop: "10px" }}
                          >
                            {item.description}
                          </a>
                        ))
                      ) : null
                    ) : (
                      <div>Progress...</div>
                    )}
                  </div>
                </div>
                <div className="dropdown show " style={{ marginTop: "65px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    // style={{ paddingLeft: "115px", paddingRight: "115px" }}
                  >
                    {ward === "" ? "Quận" : ward}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    style={{ marginTop: "100px" }}
                  >
                    {dataWardAndDistrict ? (
                      dataWardAndDistrict.length > 0 ? (
                        dataWardAndDistrict.map((item, index) => (
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              handleGetWardAndDistric2(
                                item.id,
                                item.description
                              )
                            }
                          >
                            {item.description}
                          </a>
                        ))
                      ) : (
                        <div>Vui lòng chọn Thành Phố</div>
                      )
                    ) : (
                      <div>Vui lòng chọn Thành Phố</div>
                    )}
                  </div>
                </div>
                <div className="dropdown show " style={{ marginTop: "65px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    // style={{ paddingLeft: "115px", paddingRight: "115px" }}
                  >
                    {district === "" ? "Huyện" : district}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    style={{ marginTop: "100px" }}
                  >
                    {dataWardAndDistrict2 && ward ? (
                      dataWardAndDistrict2.length > 0 ? (
                        dataWardAndDistrict2.map((item, index) => (
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              handleGetWardAndDistric3(
                                item.id,
                                item.description
                              )
                            }
                          >
                            {item.description}
                          </a>
                        ))
                      ) : (
                        <div>Vui lòng chọn Quận</div>
                      )
                    ) : (
                      <div>Vui lòng chọn Quận</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 col-5 mt-3 ml-5">
              <button
                type="submit"
                className="btn btn-warning btn-lg"
                style={{ width: "200px", marginLeft: "350px" }}
              >
                Đăng kí
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.getProvince.table,
  dataWardAndDistrict: state.getWardsAndDistrics.table,
  dataWardAndDistrict2: state.getWardsAndDistrics2.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateAccount);
