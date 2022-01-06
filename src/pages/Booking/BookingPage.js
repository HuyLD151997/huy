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
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const GetBooking = (props) => {
  const [description, setDescription] = useState("");

  const { id } = useParams();
  console.log(id);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getBookingDetail.getBookingDetail(id));
    dispatchAction(getBookingImage.getBookingImages(id));
  }, []);
  const { data, dataImg } = props;

  console.log(data);
  console.log(dataImg);

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
      {data ? (
        <div className="container">
          <div className="row m-0">
            <h2>Thông tin đặt lịch</h2>

            <Link
              type="button"
              to={`/booking-log/${data.id}`}
              className="btn btn-warning btn-lg ml-auto mr-3"
            >
              Nhật ký làm việc
            </Link>
          </div>
          {/* <h5
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {data.id !== null ? (
              <span> Mã đặt lịch: {data.id}</span>
            ) : (
              <span> Chưa có dữ liệu</span>
            )}
          </h5> */}
          <div className="row">
            <div className="col-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Mã đặt lịch:
                  {data.id !== null ? (
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {data.id}
                    </span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Tổng chi phí:
                  {data.totalPrice !== null ? (
                    <span> {data.totalPrice} VND</span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Trạng thái công việc:
                  {data.bookingStatus !== null ? (
                    <span> {data.bookingStatus.description}</span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Ghi chú:
                  {data.description !== null ? (
                    <span>{data.description}</span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  <span
                    className={
                      data.isDisable === true
                        ? "rounded p-1 border border-danger text-danger"
                        : "rounded p-1 border border-success text-success"
                    }
                    //onClick={this.onUpdateStatus}
                  >
                    {" "}
                    {data.isDisable === true
                      ? "Đặt lịch đã hủy"
                      : "Đặt lịch đang hoạt động"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Ngày/ Giờ bắt đầu: &nbsp;
                  {data.dateBegin ? (
                    <span>
                      {moment(data.dateBegin).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateBegin.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </li>
                <li className="list-group-item">
                  Ngày/ Giờ hoàn thành: &nbsp;
                  {data.dateEnd ? (
                    <span>
                      {moment(data.dateEnd).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateEnd.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </li>
                <li className="list-group-item">
                  Ngày tạo / giờ tạo:&nbsp;
                  {data.dateCreated ? (
                    <span>
                      {moment(data.dateCreated).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateCreated.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </li>
                <li className="list-group-item">
                  Ngày cập nhật / giờ cập nhật:&nbsp;
                  {data.dateUpdated ? (
                    <span>
                      {moment(data.dateUpdated).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateUpdated.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </li>
                <li className="list-group-item">
                  Địa chỉ dọn dẹp:{" "}
                  {data.address !== null ? (
                    <span>{data.address}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                  {data.ward !== null ? (
                    <span>, &nbsp;{data.ward.description}</span>
                  ) : (
                    <span></span>
                  )}
                  {data.district !== null ? (
                    <span>, &nbsp;{data.district.description}</span>
                  ) : (
                    <span></span>
                  )}
                  {data.province !== null ? (
                    <span>, &nbsp;{data.province.description}</span>
                  ) : (
                    <span></span>
                  )}
                  .
                </li>
              </ul>
            </div>
          </div>
          <h3>Thông tin dịch vụ</h3>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Dịch vụ</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thời gian dự tính</th>
                <th scope="col">Đơn giá</th>
              </tr>
            </thead>

            <tbody>
              {data.serviceBookings.map((smallItem, index) => (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>
                    {smallItem.service !== null ? (
                      <span> {smallItem.service.description}</span>
                    ) : (
                      <span> Chưa có dữ liệu</span>
                    )}
                  </td>
                  <td>
                    {smallItem.quantity !== null ? (
                      <span> {smallItem.quantity}</span>
                    ) : (
                      <span> Chưa có dữ liệu</span>
                    )}
                  </td>
                  <td>
                    {smallItem.estiamtedMinutes !== null ? (
                      <span> {smallItem.estiamtedMinutes}</span>
                    ) : (
                      <span> Chưa có dữ liệu</span>
                    )}
                  </td>
                  <td>
                    {smallItem.unitPrice !== null ? (
                      <span> {smallItem.unitPrice}</span>
                    ) : (
                      <span> Chưa có dữ liệu</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Thông tin khách hàng</h3>
          <div className="row">
            <div className="col-4">
              {data.customer.hasAvatar ? (
                <img
                  src={`http://api.beclean.store/api/Account/Avatar/${data.customer.hasAvatar}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                  }}
                />
              ) : (
                <img
                  src="data:image/jpeg;base64,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"
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                  }}
                />
              )}
            </div>
            <div className="col-8">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Họ và tên:&nbsp;
                  {data.customer.fullname ? (
                    <span>{data.customer.fullname}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Số điện thoại:&nbsp;
                  {data.customer.phoneNumber ? (
                    <span>{data.customer.phoneNumber}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Email:&nbsp;
                  {data.customer.email ? (
                    <span>{data.customer.email}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Giới tính:&nbsp;
                  {data.customer.gender ? (
                    <span>{data.customer.gender}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <h3>Thông tin nhân viên</h3>
          {data.employee ? (
            <div className="row">
              <div className="col-4">
                {data.employee.hasAvatar ? (
                  <img
                    src={`http://api.beclean.store/api/Account/Avatar/${data.employee.hasAvatar}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                    }}
                  />
                ) : (
                  <img
                    src="data:image/jpeg;base64,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"
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                    }}
                  />
                )}
              </div>
              <div className="col-8">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Mã nhân viên:&nbsp;
                    {data.employee.employeeCode ? (
                      <span>{data.employee.employeeCode}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Họ và tên:&nbsp;
                    {data.employee.fullname ? (
                      <span>{data.employee.fullname}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Số điện thoại:&nbsp;
                    {data.employee.phoneNumber ? (
                      <span>{data.employee.phoneNumber}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Email:&nbsp;
                    {data.employee.email ? (
                      <span>{data.employee.email}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Giới tính:&nbsp;
                    {data.employee.gender ? (
                      <span>{data.employee.gender}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Điểm nhân viên:&nbsp;
                    {data.employee.employeeCredit ? (
                      <span>{data.employee.employeeCredit}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <span>Chưa tìm được nhân viên phù hợp</span>
            </div>
          )}

          <div className="row">
            <div className="col-6">
              <div>
                <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                  Hình ảnh trước khi dọn dẹp
                </span>
              </div>
              <Carousel showThumbs={true} showArrows={false}>
                {dataImg ? (
                  dataImg.referenceImages.length > 0 ? (
                    dataImg.referenceImages.map((item, index) => (
                      <img
                        height="50px"
                        alt="First slide"
                        src={`http://api.beclean.store/api/BookingLog/BookingImageReference/${item}`}
                      />
                    ))
                  ) : null
                ) : (
                  <div>Progress .....</div>
                )}
              </Carousel>
            </div>
            <div className="col-6">
              <div>
                <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                  Hình ảnh sau khi dọn dẹp
                </span>
              </div>
              <Carousel showThumbs={true} showArrows={false}>
                {dataImg ? (
                  dataImg.evidenceImages.length >= 0 ? (
                    dataImg.evidenceImages.map((item, index) => (
                      <div>
                        <img
                          height="50px"
                          alt="First slide"
                          src={`http://api.beclean.store/api/BookingLog/BookingImageEvidence/${item}`}
                        />
                      </div>
                    ))
                  ) : null
                ) : (
                  <div>Progress .....</div>
                )}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        <div>Progress .....</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBookingDetail.table,
  dataImg: state.getBookingImage.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetBooking);
