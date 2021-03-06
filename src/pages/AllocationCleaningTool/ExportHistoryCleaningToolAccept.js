import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getRequestCleaningToolHistoryActions from "../../actions/RequestCleaningTool/GetRequestCleaningToolHistory";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCleaningToolApi } from "../../apis/CleaningTool/DeleteCleaningTool";
import { updateCleaningToolApi } from "../../apis/CleaningTool/UpdateCleaningTool";
import { updateCleaningToolImgApi } from "../../apis/CleaningTool/UpdateCleaningToolImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";
import * as getSearchHistoryActions from "../../actions/RequestCleaningTool/SearchHistory";

const RequestCleaningToolHistoryPage = (props) => {
  const [search, setSearch] = useState("");
  const dispatchAction = useDispatch();
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageHistoryRequestCleaningTool = localStorage.getItem(
    "TotalPageHistoryRequestCleaningTool"
  );
  useEffect(() => {
    dispatchAction(
      getRequestCleaningToolHistoryActions.getRequestCleaningToolHistory(
        page,
        perPage
      )
    );
  }, [page, perPage, loading1]);
  const { data, loading, dataSearch } = props;

  console.log(data);

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

  const handleSearch = () => {
    if (search === "") {
      dispatchAction(getSearchHistoryActions.searchHistory(" ", page, perPage));
    }
    dispatchAction(
      getSearchHistoryActions.searchHistory(search, page, perPage)
    );
  };

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCleaningToolApi(id);
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

  const handleUpdateServiceName = async (id, description, quantity) => {
    try {
      console.log(data);
      await updateCleaningToolApi(id, { description, quantity });
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

  const handleUpdateImgCleaningTool = async (id, File) => {
    try {
      console.log(data);
      await updateCleaningToolImgApi(id, { File });
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
      description: yup.string().required("T??n di??ch vu?? kh??ng ????????c ?????? tr????ng"),
      quantity: yup
        .number()
        .typeError("S??? l?????ng ph???i l?? s???")
        .required("S??? l?????ng kh??ng ???????c ????? tr???ng"),
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

  return (
    <div className="container table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Xem tr?????c khi xu???t t???p tin</h2>
        <div className="ml-auto mr-3" style={{ marginLeft: "450px" }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success"
            // className="btn btn-success mx-auto d-block"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="T???i file excel"
          />
        </div>
      </div>
      <form className="input-group mb-3 border-0" style={{ width: "500px" }}>
        <input
          className="ml-auto form-control"
          type="text"
          placeholder="T??m ki???m d???ng c???"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div class="input-group-append">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSearch}
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
      <table className="table align-middle mt-2" id="table-to-xls">
        <thead className="table-light">
          <tr>
            <th scope="col">D???ng c???</th>
            <th scope="col">Nh??n vi??n</th>
            <th scope="col">L?? do xin c???p ph??t</th>
            <th scope="col">Ng??y/Gi??? y??u c???u</th>
            <th scope="col">Ng??y/Gi??? c???p ph??t</th>
            <th scope="col">Tr???ng th??i</th>
          </tr>
        </thead>
        {!loading ? (
          data ? (
            dataSearch ? (
              search === "" || dataSearch.total === 0 ? (
                data.data.map((item, index) => (
                  <tbody>
                    <tr className="">
                      <td className=" align-middle">
                        {item.cleaningTool.description}
                      </td>
                      <td className=" align-middle">
                        {item.employee.fullname}
                      </td>
                      <td className="align-middle">
                        {item.description === null ? (
                          <span>Kh??ng c?? d??? li???u</span>
                        ) : (
                          <span>{item.description}</span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {moment(item.dateCreated).format("DD/MM/YYYY")}
                        &nbsp;/ {item.dateCreated.substring(11, 16)}
                      </td>
                      <td className=" align-middle">
                        {moment(item.dateUpdated).format("DD/MM/YYYY")}
                        &nbsp;/ {item.dateUpdated.substring(11, 16)}
                      </td>
                      <td className=" align-middle ">
                        {(() => {
                          switch (item.requestStatus.id) {
                            case "REJECTED":
                              return (
                                <span className="text-danger border border-danger rounded p-1">
                                  <i class="fa fa-times-circle mr-1"></i>
                                  {item.requestStatus.description}
                                </span>
                              );
                            case "CANCELLED":
                              return (
                                <span className="text-warning border border-warning rounded p-1">
                                  <i class="fa fa-times-circle mr-1"></i>
                                  {item.requestStatus.description}
                                </span>
                              );
                            case "PROVIDED":
                              return (
                                <span className="text-success border border-success rounded p-1">
                                  <i class="fa fa-check-circle mr-1"></i>
                                  {item.requestStatus.description}
                                </span>
                              );

                            default:
                              return null;
                          }
                        })()}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : search !== "" && dataSearch.total !== 0 ? (
                dataSearch.data.map((item, index) => (
                  <tbody>
                    <tr className="">
                      <td className=" align-middle">
                        {item.cleaningTool.description}
                      </td>
                      <td className=" align-middle">
                        {item.employee.fullname}
                      </td>
                      <td className="align-middle">
                        {item.description === null ? (
                          <span>Kh??ng c?? d??? li???u</span>
                        ) : (
                          <span>{item.description}</span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {moment(item.dateCreated).format("DD/MM/YYYY")}
                        &nbsp;/ {item.dateCreated.substring(11, 16)}
                      </td>
                      <td className=" align-middle">
                        {moment(item.dateUpdated).format("DD/MM/YYYY")}
                        &nbsp;/ {item.dateUpdated.substring(11, 16)}
                      </td>
                      <td className=" align-middle ">
                        {(() => {
                          switch (item.requestStatus.id) {
                            case "REJECTED":
                              return (
                                <span className="text-danger border border-danger rounded p-1">
                                  <i class="fa fa-times-circle mr-1"></i>
                                  {item.requestStatus.description}
                                </span>
                              );
                            case "CANCELLED":
                              return (
                                <span className="text-warning border border-warning rounded p-1">
                                  <i class="fa fa-times-circle mr-1"></i>
                                  {item.requestStatus.description}
                                </span>
                              );
                            case "PROVIDED":
                              return (
                                <span className="text-success border border-success rounded p-1">
                                  <i class="fa fa-check-circle mr-1"></i>
                                  {item.requestStatus.description}
                                </span>
                              );

                            default:
                              return null;
                          }
                        })()}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <div>Kh??ng t??m th???y k???t qu???</div>
              )
            ) : (
              data.data.map((item, index) => (
                <tbody>
                  <tr className="">
                    <td className=" align-middle">
                      {item.cleaningTool.description}
                    </td>
                    <td className=" align-middle">{item.employee.fullname}</td>
                    <td className="align-middle">
                      {item.description === null ? (
                        <span>Kh??ng c?? d??? li???u</span>
                      ) : (
                        <span>{item.description}</span>
                      )}
                    </td>
                    <td className=" align-middle">
                      {moment(item.dateCreated).format("DD/MM/YYYY")}
                      &nbsp;/ {item.dateCreated.substring(11, 16)}
                    </td>
                    <td className=" align-middle">
                      {moment(item.dateUpdated).format("DD/MM/YYYY")}
                      &nbsp;/ {item.dateUpdated.substring(11, 16)}
                    </td>
                    <td className=" align-middle ">
                      {(() => {
                        switch (item.requestStatus.id) {
                          case "REJECTED":
                            return (
                              <span className="text-danger border border-danger rounded p-1">
                                <i class="fa fa-times-circle mr-1"></i>
                                {item.requestStatus.description}
                              </span>
                            );
                          case "CANCELLED":
                            return (
                              <span className="text-warning border border-warning rounded p-1">
                                <i class="fa fa-times-circle mr-1"></i>
                                {item.requestStatus.description}
                              </span>
                            );
                          case "PROVIDED":
                            return (
                              <span className="text-success border border-success rounded p-1">
                                <i class="fa fa-check-circle mr-1"></i>
                                {item.requestStatus.description}
                              </span>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </td>
                  </tr>
                </tbody>
              ))
            )
          ) : (
            <div>Ch??a c?? d??? li???u</div>
          )
        ) : (
          <div>Loading .....</div>
        )}
      </table>
      <Pagination
        count={Math.ceil(totalPageHistoryRequestCleaningTool / perPage)}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getRequestCleaningToolHistory.table,
  loading: state.getRequestCleaningToolHistory.loading,
  dataSearch: state.searchHistory.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(RequestCleaningToolHistoryPage));
