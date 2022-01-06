import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import FileReaderInput from "react-file-reader-input";
import { render } from "react-dom";

const ListCodePage = (props) => {
  const [search, setSearch] = useState("");
  //   const dispatchAction = useDispatch();
  //   useEffect(() => {
  //     dispatchAction();
  //   }, []);
  const { data } = props;

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
      type: yup
        .string()
        .required("Loại không được để trống")
        .matches(
          /(NORMAL|OVERALL|OPTIONAL)/,
          "Chỉ được chọn một trong ba cái có sẵn"
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    handleSubmitImg,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="container ml-2 table-responsive-xl">
      <div className="row m-0">
        <h2>Danh sách mã khuyến mãi</h2>
        <input
          className="ml-auto mr-4"
          type="text"
          placeholder="Tìm kiếm mã khuyến mãi"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: "500px", height: "35px" }}
        />
      </div>

      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Mã khuyến mãi</th>
            <th scope="col">Ghi chú</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Ngày/Giờ tạo</th>
            <th scope="col">Ngày/Giờ cập nhật</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="" key="">
            <td className="col-2 align-middle">ABC</td>
            <td className="col-2 align-middle">Giảm giá 30%</td>
            <td className="col-2 align-middle">Còn sử dụng</td>
            <td className="col-2 align-middle">Ngày/Giờ tạo</td>
            <td className="col-2 align-middle">Ngày/Giờ cập nhật</td>
            <td className="col-2 align-middle">
              <i
                class="fa fa-lock text-danger"
                type="button"
                style={{ fontSize: "30px", marginTop: "15px" }}
              ></i>
              <i
                class="fa fa-edit"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever="yah"
                style={{
                  fontSize: "30px",
                  margin: "auto",
                  marginLeft: "50px",
                }}
              ></i>
            </td>
          </tr>
          <tr className="" key="">
            <td className="col-2 align-middle">ABC</td>
            <td className="col-2 align-middle">Giảm giá 30%</td>
            <td className="col-2 align-middle">Không còn sử dụng</td>
            <td className="col-2 align-middle">Ngày/Giờ tạo</td>
            <td className="col-2 align-middle">Ngày/Giờ cập nhật</td>
            <td className="col-2 align-middle">
              <i
                class="fa fa-unlock-alt text-success"
                type="button"
                style={{ fontSize: "30px", marginTop: "15px" }}
              ></i>
              <i
                class="fa fa-edit"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever="yah"
                style={{
                  fontSize: "30px",
                  margin: "auto",
                  marginLeft: "50px",
                }}
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ListCodePage));
