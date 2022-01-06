import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getBookingDetail from "../../actions/Booking/GetBookingDetail";
import * as getBookingImage from "../../actions/BookingLog/GetBookingImage";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";
import Swal from "sweetalert2";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const GetBooking = (props) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getBookingDetail.getBookingDetail(id));
    // dispatchAction(getBookingImage.getBookingImages(id));
  }, []);
  const { data } = props;

  console.log(data);

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
      unitPrice: yup.string().required("Giá tiền dịch vụ không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div>
      <div className="container">
        <div className="row m-0">
          <h2>Xem trước khi xuất tập tin</h2>
          <div className="ml-auto mr-3" style={{ marginLeft: "450px" }}>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-success"
              // className="btn btn-success mx-auto d-block"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Tải file excel"
            />
          </div>
        </div>
        <table className="table align-middle mt-2" id="table-to-xls">
          <thead className="table-light">
            <tr>
              <th scope="col">Mã đặt lịch</th>
              <th scope="col">Khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Nhân viên</th>
              <th scope="col">Email nhân viên</th>
              <th scope="col">Ngày/Giờ làm</th>
              <th scope="col">Ngày/Giờ hoàn thành</th>
              <th scope="col">Tổng tiền</th>
            </tr>
          </thead>
          {data ? (
            <tbody>
              <tr className="">
                <td className="col-2 align-middle">
                  {data.id ? (
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {data.id}
                    </span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.customer.fullname ? (
                    <span>{data.customer.fullname}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.customer.phoneNumber ? (
                    <span>{data.customer.phoneNumber}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.employee !== null ? (
                    <span>{data.employee.fullname}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.employee !== null ? (
                    <span>{data.employee.email}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.dateBegin ? (
                    <span>
                      {moment(data.dateBegin).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateBegin.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.dateEnd ? (
                    <span>
                      {moment(data.dateEnd).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateEnd.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </td>
                <td className=" align-middle">
                  {data.totalPrice !== null ? (
                    <span> {data.totalPrice} VND</span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </td>
              </tr>
            </tbody>
          ) : (
            <div>Progress .....</div>
          )}
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBookingDetail.table,
  // dataImg: state.getBookingImage.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetBooking);
