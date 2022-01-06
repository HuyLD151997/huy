import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import img from "../../img/48x48.png";
import { NavLink, Link, useParams } from "react-router-dom";
import * as getNewBookingDetail from "../../actions/Booking/GetNewBookingDetail";
import * as moment from "moment";
import { coordinatorEmpApi } from "../../apis/Booking/CoordinatorEmp";
import Swal from "sweetalert2";

const CoordinatorEmpPage = (props) => {
  const { id } = useParams();
  console.log(id);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getNewBookingDetail.getNewBookingDetail(id));
  }, []);
  const { data } = props;

  console.log(data);

  const handleActive = (id, empId) => {
    handlecoordinator(id, empId);
  };

  const handlecoordinator = async (id, empId) => {
    try {
      await coordinatorEmpApi(id, empId);
      Swal.fire({
        icon: "success",
        text: "Kích hoạt thành công",
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.replace("/wait-booking");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "active failed ",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      {data ? (
        <div className="row">
          <div className="col-6">
            <h4 className="text-center">Điều phối nhân viên</h4>
            <div>
              <h5>Thông tin khách hàng</h5>
              <div className="row mb-4">
                {data.bookingDetail.customer.hasAvatar ? (
                  <img
                    src={`http://api.beclean.store/api/Account/Avatar/${data.bookingDetail.customer.hasAvatar}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "block",
                      marginLeft: "30px",
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
                <div style={{ marginLeft: "100px" }}>
                  <div className="">
                    <span>
                      <span style={{ fontWeight: 500 }}>Họ tên: </span>
                      {data.bookingDetail.customer.fullname ? (
                        <span>{data.bookingDetail.customer.fullname}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span>
                      <span style={{ fontWeight: 500 }}>Số điện thoại: </span>
                      {data.bookingDetail.customer.phoneNumber ? (
                        <span>{data.bookingDetail.customer.phoneNumber}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span>
                      <span style={{ fontWeight: 500 }}>Email: </span>
                      {data.bookingDetail.customer.email ? (
                        <span>{data.bookingDetail.customer.email}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>Thông tin đặt lịch</h5>
              <div style={{ marginLeft: "20px" }}>
                <div className="">
                  <span style={{ fontWeight: 500 }}>Mã đặt lịch: </span>
                  {data.bookingDetail.id !== null ? (
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {data.bookingDetail.id}
                    </span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </div>
                <div className="mt-3">
                  <span style={{ fontWeight: 500 }}>Địa chỉ: </span>
                  {data.bookingDetail.address !== null ? (
                    <span>{data.bookingDetail.address}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                  {data.bookingDetail.ward !== null ? (
                    <span>, &nbsp;{data.bookingDetail.ward.description}</span>
                  ) : (
                    <span></span>
                  )}
                  {data.bookingDetail.district !== null ? (
                    <span>
                      , &nbsp;{data.bookingDetail.district.description}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  {data.bookingDetail.province !== null ? (
                    <span>
                      , &nbsp;{data.bookingDetail.province.description}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="mt-3">
                  <span style={{ fontWeight: 500 }}>Ngày - Giờ bắt đầu: </span>
                  {data.bookingDetail.dateBegin ? (
                    <span>
                      {moment(data.bookingDetail.dateBegin).format(
                        "DD/MM/YYYY"
                      )}
                      &nbsp;- {data.bookingDetail.dateBegin.substring(11, 16)}
                    </span>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </div>
                <div className="mt-3">
                  <span style={{ fontWeight: 500 }}>
                    Ghi chú:{" "}
                    {data.bookingDetail.description !== null ? (
                      <span>{data.bookingDetail.description}</span>
                    ) : (
                      <span>Không có</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h5>Thông tin dịch vụ</h5>
              <table className="table align-middle mt-2">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Dịch vụ</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thời gian thực hiện</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bookingDetail.serviceBookings.map(
                    (smallItem, index) => (
                      <tr className="align-middle">
                        <td className="align-middle">
                          {smallItem.service !== null ? (
                            <span> {smallItem.service.description}</span>
                          ) : (
                            <span> Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {" "}
                          {smallItem.quantity !== null ? (
                            <span> {smallItem.quantity}</span>
                          ) : (
                            <span> Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {smallItem.estiamtedMinutes !== null ? (
                            <span> {smallItem.estiamtedMinutes} giờ</span>
                          ) : (
                            <span> Chưa có dữ liệu</span>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              borderLeft: "2px solid ",
              // marginLeft: "14px",
            }}
            className="col-6"
          >
            <div>
              <h4 className="text-center">Gợi ý nhân viên</h4>
              {data ? (
                data.listEmp.length > 0 ? (
                  data.listEmp.map((itemEmp, index) => (
                    <div
                      className="row border rounded ml-2 mr-2 mb-4"
                      style={{ boxShadow: "10px 10px 5px grey" }}
                    >
                      {itemEmp.hasAvatar ? (
                        <img
                          src={`http://api.beclean.store/api/Account/Avatar/${itemEmp.hasAvatar}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "block",
                            marginLeft: "10px",
                            marginTop: "10px",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src="data:image/jpeg;base64,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"
                          style={{
                            width: "150px",
                            height: "150px",
                            display: "block",
                            marginLeft: "10px",
                            margiginTop: "10px",
                            marnRight: "10px",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <div className="mt-2">
                        <div>
                          <span style={{ fontWeight: 500 }}>
                            Mã nhân viên:{" "}
                          </span>
                          {itemEmp.employeeCode ? (
                            <span>{itemEmp.employeeCode}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </div>
                        <div>
                          <span style={{ fontWeight: 500 }}>Họ tên: </span>
                          {itemEmp.fullname ? (
                            <span>{itemEmp.fullname}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </div>
                        <div>
                          <span style={{ fontWeight: 500 }}>Đánh giá: </span>
                          {itemEmp.avgRating === 0 ? (
                            <span>
                              {itemEmp.avgRating} <i class="fa fa-star"></i>
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </div>
                        <div>
                          <span style={{ fontWeight: 500 }}>Khoảng cách: </span>
                          {itemEmp.distance ? (
                            <span>{itemEmp.distance} km</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </div>
                        <div>
                          <span style={{ fontWeight: 500 }}>
                            Số lượng đặt lịch:{" "}
                          </span>
                          {itemEmp.numberOfBooking !== 0 ? (
                            <span>{itemEmp.numberOfBooking} </span>
                          ) : (
                            <span>0</span>
                          )}
                        </div>
                      </div>
                      <div
                        className=""
                        style={{
                          marginTop: "30px",
                          marginLeft: "auto",
                          marginRight: "10px",
                        }}
                      >
                        <button
                          className="btn btn-warning text-white btn-lg"
                          type="button"
                          onClick={() => handleActive(id, itemEmp.id)}
                        >
                          Chọn
                        </button>
                      </div>
                    </div>
                  ))
                ) : null
              ) : (
                <div>Chưa có dữ liệu</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading .....</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getNewBookingDetail.table,
  //   loading: state.getEmployees.loading,
  //   dataSearch: state.searchEmployee.table,
});

const withConnect = connect(mapStateToProps);
export default withConnect(CoordinatorEmpPage);
