import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getTransactionUsersActions from "../../actions/Transaction/GetTransactionUser";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteServiceGroupApi } from "../../apis/ServiceGroup/DeleteServiceGroup";
import { updateServiceGroupApi } from "../../apis/ServiceGroup/UpdateServiceGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";

const TransactionCusPage = (props) => {
  const [description, setDescription] = useState("");
  const [idService, setIdService] = useState("");
  const [search, setSearch] = useState("");
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageTransactionUser = localStorage.getItem(
    "TotalPageTransactionUser"
  );
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(
      getTransactionUsersActions.getTransactionUsers(page, perPage)
    );
  }, [page, perPage, loading1]);
  const { data, loading } = props;
  console.log(data);

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteServiceGroupApi(id);
      Swal.fire({
        icon: "success",
        text: "delete status success",
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "delete failed ",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdateServiceName = async (id, description) => {
    try {
      console.log(data);
      await updateServiceGroupApi(id, { description });
      Swal.fire({
        icon: "success",
        text: "active status success",
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "active failed ",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGetDescription = (description, id) => {
    setDescription(description);
    setIdService(id);
  };

  const submitForm = (data) => {
    handleUpdateServiceName(idService, data.description);
  };

  return (
    <div className="container table-responsive-xl p-0 mt-2">
      <div className="row">
        <h3>Giao dịch khách hàng</h3>
        <input
          className="ml-auto mr-4"
          type="text"
          placeholder="Tìm kiếm mã đặt lịch"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: "500px", height: "35px" }}
        />
      </div>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Khách hàng</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Ghi chú</th>
            <th scope="col">Ngày/Giờ tạo</th>
            <th scope="col">Mã đặt lịch</th>
            {/* <th scope="col">Trạng thái</th> */}
          </tr>
        </thead>
        {!loading ? (
          data ? (
            data.data.length > 0 ? (
              data.data
                .filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (
                    item.bookingId &&
                    item.bookingId.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return item;
                  } else {
                    return "";
                  }
                })
                .map((item, index) => (
                  <tbody>
                    <tr className="" key={index}>
                      <td className="">
                        {item.user.fullname !== null ? (
                          <span>{item.user.fullname}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="">
                        {item.deposit !== null ? (
                          <span>{item.deposit} VND</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="">
                        {item.description !== null ? (
                          <span>{item.description}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="">
                        {item.dateCreated ? (
                          <span>
                            {moment(item.dateCreated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateCreated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="">
                        {item.bookingId !== null ? (
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            {item.bookingId}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                    </tr>
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
        count={Math.ceil(totalPageTransactionUser / perPage)}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getTransactionUser.table,
  loading: state.getTransactionUser.loading,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(TransactionCusPage));
