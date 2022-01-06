import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import * as getNewBookingActions from "../../actions/Booking/GetNewBooking";
import * as moment from "moment";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";

const WaitBookingPage = (props) => {
  const dispatchAction = useDispatch();
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageNewBooking = localStorage.getItem("TotalPageNewBooking");
  useEffect(() => {
    dispatchAction(getNewBookingActions.getNewBookings(page, perPage));
  }, [page, perPage, loading1]);
  const { data, loading } = props;

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

  return (
    <div>
      <h2>Lịch đặt đang chờ điều phối</h2>
      <table className="table align-middle mt-2">
        <thead className="table-light">
          <tr>
            <th scope="col">Mã đặt lịch</th>
            <th scope="col">Khách hàng</th>
            <th scope="col">Ngày- Giờ làm</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
          </tr>
        </thead>

        {!loading ? (
          data ? (
            data.data.length > 0 ? (
              data.data.map((item, index) => (
                <tbody>
                  <tr className="align-middle">
                    <td
                      className="col-2 align-middle"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {item.id !== null ? (
                        <span>{item.id}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {item.customer !== null ? (
                        <span>{item.customer.fullname}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {item.dateBegin !== null ? (
                        <div>
                          {moment(item.dateBegin).format("DD/MM/YYYY")}
                          &nbsp;- {item.dateBegin.substring(11, 16)}
                        </div>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </td>
                    <td className="col-4 align-middle">
                      {item.address !== null ? (
                        <span>{item.address}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                      {item.ward !== null ? (
                        <span>, &nbsp;{item.ward.description}</span>
                      ) : (
                        <span></span>
                      )}
                      {item.district !== null ? (
                        <span>, &nbsp;{item.district.description}</span>
                      ) : (
                        <span></span>
                      )}
                      {item.province !== null ? (
                        <span>, &nbsp;{item.province.description}</span>
                      ) : (
                        <span></span>
                      )}
                    </td>
                    <td className="align-middle">
                      {item.bookingStatus !== null ? (
                        <span>{item.bookingStatus.description}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </td>
                    <td className="align-middle">
                      <Link
                        type="button"
                        to={`/coordinator-emp/${item.id}`}
                        className="btn btn-warning text-white"
                      >
                        Điều phối
                      </Link>
                    </td>
                  </tr>
                  {/* <tr className="align-middle">
                    <td className="align-middle">789-vbn</td>
                    <td className="align-middle">Nguyễn C</td>
                    <td className="align-middle">28/12/2021 - 10h30</td>
                    <td className="align-middle">
                      Bà Điểm, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam
                    </td>
                    <td className="align-middle">Đang chờ</td>
                    <td className="align-middle">
                      <Link
                        type="button"
                        to="/coordinator-emp"
                        className="btn btn-warning text-white"
                      >
                        Điều phối
                      </Link>
                    </td>
                  </tr> */}
                </tbody>
              ))
            ) : null
          ) : (
            <div>Chưa có dữ liệu</div>
          )
        ) : (
          <div>Loading .....</div>
        )}
      </table>
      <Pagination
        count={Math.ceil(totalPageNewBooking / perPage)}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getNewBooking.table,
  loading: state.getNewBooking.loading,
  //   dataSearch: state.searchEmployee.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(WaitBookingPage));
