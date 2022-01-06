import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getServiceByIdAction from "../../actions/ServicesGroup/GetServiceById";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";
import Swal from "sweetalert2";
import * as yup from "yup";
import { deleteServiceApi } from "../../apis/Service/DeleteService";
import { updateServiceApi } from "../../apis/Service/UpdateServiceGroup";
import { updateServiceStatusApi } from "../../apis/Service/UpdateServiceStatus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as getServiceGroupsAction from "../../actions/ServicesGroup/GetServiceGroups";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";
import { getServiceGroupsByIdApi } from "../../apis/ServiceGroup/GetServiceGroups";
import * as getServiceSearchActions from "../../actions/ServicesGroup/SearchService";

const GetServiceById = (props) => {
  const [serGroup, setSerGroup] = useState("");
  const [idSerGroup, setIdSerGroup] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [idService, setIdService] = useState("");
  const [dataServiceGroupByID, setDataServiceGroupByID] = useState(null);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageService = localStorage.getItem("TotalPageService");
  const dispatchAction = useDispatch();

  // console.log(id, page, perPage);
  useEffect(() => {
    dispatchAction(getServiceByIdAction.getServiceById(id, page, perPage));
    dispatchAction(getServiceGroupsAction.getServiceGroups(page, perPage));
    if (id) {
      console.log(id);
      (async () => {
        try {
          const dataServiceGroupByIDGet = await getServiceGroupsByIdApi(
            id,
            page,
            perPage
          );
          setDataServiceGroupByID(dataServiceGroupByIDGet.data);
          console.log(dataServiceGroupByIDGet.data);
        } catch (error) {
          console.log("Không thể lấy danh sách");
        }
      })();
    }
  }, [page, perPage, loading1]);

  const { data, dataSerGroup, loading, dataSearch } = props;

  console.log(data);

  const handleSearch = () => {
    if (search === "") {
      dispatchAction(
        getServiceSearchActions.searchService(id, " ", page, perPage)
      );
    }
    dispatchAction(
      getServiceSearchActions.searchService(id, search, page, perPage)
    );
  };

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleGetSerGroup = (id, description) => {
    console.log("description" + description);
    console.log("id" + id);

    setIdSerGroup(id);
    setSerGroup(description);
  };

  const handleConfirmDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa dữ liệu này ?",
      text: "Việc này có thể ảnh hưởng tới hiển thị dữ liệu",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteServiceApi(id);
      Swal.fire({
        icon: "success",
        text: "Xóa dịch vụ thành công",
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

  const handleUpdateServiceName = async (
    id,
    serviceGroupId,
    description,
    unitPrice,
    type
  ) => {
    try {
      console.log(data);
      await updateServiceApi(id, {
        unitPrice,
        canInputQuantity: true,
        serviceGroupId,
        description,
        type,
      });
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

  yup.addMethod(yup.string, "stripEmptyString", function () {
    return this.transform((value) => (value === "" ? undefined : value));
  });

  const validationSchema = yup
    .object()
    .shape({
      descriptionUpdate: yup
        .string()
        .stripEmptyString("Tên dịch vụ không được để trống")
        .default(description),
      unitPriceUpdate: yup
        .string()
        .stripEmptyString("Giá tiền dịch vụ không được để trống")
        .default(unitPrice.toString()),
      typeUpdate: yup
        .string()
        .stripEmptyString("Loại dịch vụ không được để trống")
        .default(type)
        .matches(/(AREA|QUANTITY)/, "Phải chọn AREA hoặc QUANTITY"),
      // serGroup: yup.string().required("Vui lòng chọn nhóm dịch vụ"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleActive = (id) => {
    handleUpdateServiceStatus(id);
  };

  const handleUpdateServiceStatus = async (id) => {
    try {
      await updateServiceStatusApi(id);
      Swal.fire({
        icon: "success",
        text: "Kích hoạt thành công",
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
  console.log(dataServiceGroupByID);
  const handleGetDescription = (description, id, unitPrice, type) => {
    setDescription(description);
    setIdService(id);
    setUnitPrice(unitPrice);
    setType(type);
  };

  const submitForm = (data) => {
    var unitPriceNum = parseInt(data.unitPriceUpdate);

    if (idSerGroup === "" && dataServiceGroupByID) {
      handleUpdateServiceName(
        idService,
        dataServiceGroupByID.data[0].id,
        data.descriptionUpdate,
        unitPriceNum,
        data.typeUpdate
      );
    }
    handleUpdateServiceName(
      idService,
      idSerGroup,
      data.descriptionUpdate,
      unitPriceNum,
      data.typeUpdate
    );
    // console.log(data);
  };

  return (
    // <div>
    //   {data ? (
    //     data.length > 0 ? (
    //       data.map((item, index) => <p>{item.description}</p>)
    //     ) : null
    //   ) : (
    //     <div>Progress .....</div>
    //   )}
    // </div>
    <div className="container table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Thông tin dịch vụ</h2>

        <NavLink
          type="button"
          to={`/add-service-item/${id}`}
          className="btn btn-warning btn-lg ml-auto mr-3"
        >
          Tạo dịch vụ
        </NavLink>
      </div>
      <div>
        <form className="input-group mb-3 border-0" style={{ width: "500px" }}>
          <input
            className="ml-auto form-control"
            type="text"
            placeholder="Tìm kiếm dịch vụ"
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
        {/* <input
          className="ml-auto mr-4"
          type="text"
          placeholder="Tìm kiếm dịch vụ"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: "500px", height: "35px" }}
        /> */}
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">Dịch vụ</th>
              <th scope="col">Loại</th>
              <th scope="col">Ngày/Giờ tạo</th>
              <th scope="col">Ngày/Giờ cập nhật</th>
              <th scope="col">Giá cả</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {!loading ? (
            data ? (
              dataSearch ? (
                search === "" || dataSearch.total === 0 ? (
                  data.data.map((item, index) => (
                    <tbody>
                      <tr key={index}>
                        <td className="col-2 align-middle">
                          {item.description !== null ? (
                            <span>{item.description}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.type === "AREA" ? (
                            ""
                          ) : (
                            <span className="text-primary  rounded p-1">
                              {item.type}
                            </span>
                          )}
                          {item.type === "QUANTITY" ? (
                            ""
                          ) : (
                            <span className="text-success  rounded p-1">
                              {item.type}
                            </span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.dateCreated ? (
                            <span>
                              {moment(item.dateCreated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateCreated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.dateUpdated ? (
                            <span>
                              {moment(item.dateUpdated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateUpdated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className=" align-middle">
                          {item.unitPrice !== null ? (
                            <span>{item.unitPrice} VND</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className=" align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <span className="text-danger">Tạm dừng</span>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <span className="text-success border border-success rounded p-1">
                              Hoạt động
                            </span>
                          )}
                        </td>
                        <td className=" align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-unlock-alt text-success"
                              type="button"
                              style={{ fontSize: "30px", marginTop: "8px" }}
                              onClick={() => handleActive(item.id)}
                            ></i>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-lock text-danger"
                              type="button"
                              style={{ fontSize: "30px", marginTop: "8px" }}
                              onClick={() => handleConfirmDelete(item.id)}
                            ></i>
                          )}
                          <i
                            class="fa fa-edit"
                            type="button"
                            onClick={() =>
                              handleGetDescription(
                                item.description,
                                item.id,
                                item.unitPrice,
                                item.type
                              )
                            }
                            data-toggle="modal"
                            data-target="#exampleModal"
                            data-whatever="yah"
                            style={{
                              fontSize: "30px",
                              margin: "auto",
                              marginTop: "8px",
                              marginLeft: "20px",
                            }}
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : search !== "" && dataSearch.total !== 0 ? (
                  dataSearch.data.map((item, index) => (
                    <tbody>
                      <tr key={index}>
                        <td className="col-2 align-middle">
                          {item.description !== null ? (
                            <span>{item.description}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.type === "AREA" ? (
                            ""
                          ) : (
                            <span className="text-primary  rounded p-1">
                              {item.type}
                            </span>
                          )}
                          {item.type === "QUANTITY" ? (
                            ""
                          ) : (
                            <span className="text-success  rounded p-1">
                              {item.type}
                            </span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.dateCreated ? (
                            <span>
                              {moment(item.dateCreated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateCreated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.dateUpdated ? (
                            <span>
                              {moment(item.dateUpdated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateUpdated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className=" align-middle">
                          {item.unitPrice !== null ? (
                            <span>{item.unitPrice} VND</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className=" align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <span className="text-danger">Tạm dừng</span>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <span className="text-success border border-success rounded p-1">
                              Hoạt động
                            </span>
                          )}
                        </td>
                        <td className=" align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-unlock-alt text-success"
                              type="button"
                              style={{ fontSize: "30px", marginTop: "8px" }}
                              onClick={() => handleActive(item.id)}
                            ></i>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-lock text-danger"
                              type="button"
                              style={{ fontSize: "30px", marginTop: "8px" }}
                              onClick={() => handleConfirmDelete(item.id)}
                            ></i>
                          )}
                          <i
                            class="fa fa-edit"
                            type="button"
                            onClick={() =>
                              handleGetDescription(
                                item.description,
                                item.id,
                                item.unitPrice,
                                item.type
                              )
                            }
                            data-toggle="modal"
                            data-target="#exampleModal"
                            data-whatever="yah"
                            style={{
                              fontSize: "30px",
                              margin: "auto",
                              marginTop: "8px",
                              marginLeft: "20px",
                            }}
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <div>Không tìm thấy kết quả</div>
                )
              ) : (
                data.data.map((item, index) => (
                  <tbody>
                    <tr key={index}>
                      <td className="col-2 align-middle">
                        {item.description !== null ? (
                          <span>{item.description}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.type === "AREA" ? (
                          ""
                        ) : (
                          <span className="text-primary  rounded p-1">
                            {item.type}
                          </span>
                        )}
                        {item.type === "QUANTITY" ? (
                          ""
                        ) : (
                          <span className="text-success  rounded p-1">
                            {item.type}
                          </span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.dateCreated ? (
                          <span>
                            {moment(item.dateCreated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateCreated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.dateUpdated ? (
                          <span>
                            {moment(item.dateUpdated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateUpdated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {item.unitPrice !== null ? (
                          <span>{item.unitPrice} VND</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <span className="text-danger">Tạm dừng</span>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <span className="text-success border border-success rounded p-1">
                            Hoạt động
                          </span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <i
                            class="fa fa-unlock-alt text-success"
                            type="button"
                            style={{ fontSize: "30px", marginTop: "8px" }}
                            onClick={() => handleActive(item.id)}
                          ></i>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <i
                            class="fa fa-lock text-danger"
                            type="button"
                            style={{ fontSize: "30px", marginTop: "8px" }}
                            onClick={() => handleConfirmDelete(item.id)}
                          ></i>
                        )}
                        <i
                          class="fa fa-edit"
                          type="button"
                          onClick={() =>
                            handleGetDescription(
                              item.description,
                              item.id,
                              item.unitPrice,
                              item.type
                            )
                          }
                          data-toggle="modal"
                          data-target="#exampleModal"
                          data-whatever="yah"
                          style={{
                            fontSize: "30px",
                            margin: "auto",
                            marginTop: "8px",
                            marginLeft: "20px",
                          }}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                ))
              )
            ) : (
              <div>Chưa có dữ liệu</div>
            )
          ) : (
            <div>Loading .....</div>
          )}
        </table>
        <Pagination
          count={Math.ceil(totalPageService / perPage)}
          color="primary"
          onChange={handleChangePage}
        />
      </div>

      <div
        className="modal fade mt-5"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100" id="exampleModalLabel">
                Cập nhật dịch vụ
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // style={{ marginLeft: "160px" }}
              >
                <span aria-hidden="true" style={{ float: "right" }}>
                  ×
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Dịch vụ
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    defaultValue={description}
                    name="descriptionUpdate"
                    {...register("descriptionUpdate")}
                  />
                  <p>{errors.descriptionUpdate?.message}</p>
                </div>
                <div className="form-group">
                  <label>Loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("typeUpdate")}
                    defaultValue={type}
                  >
                    <option selected="">{type}</option>
                    {type === "AREA" ? (
                      <option value="QUANTITY">QUANTITY</option>
                    ) : (
                      <option value="AREA">AREA</option>
                    )}
                  </select>
                  <p>{errors.typeUpdate?.message}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Giá
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("unitPriceUpdate")}
                    defaultValue={unitPrice}
                  />
                  <p>{errors.unitPriceUpdate?.message}</p>
                </div>

                <div
                  className="dropdown show w-100"
                  style={{ marginTop: "35px" }}
                >
                  <span>Vui lòng chọn nhóm dịch vụ</span>
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ paddingLeft: "95px", paddingRight: "95px" }}
                  >
                    {serGroup === ""
                      ? dataServiceGroupByID
                        ? dataServiceGroupByID.data.length > 0
                          ? dataServiceGroupByID.data[0].description
                          : "Nhóm dịch vụ"
                        : null
                      : serGroup}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {dataSerGroup ? (
                      dataSerGroup.data.length > 0 ? (
                        dataSerGroup.data.map((item, index) => (
                          <a
                            className="dropdown-item"
                            key={index}
                            onClick={() =>
                              handleGetSerGroup(item.id, item.description)
                            }
                          >
                            {item.description}
                          </a>
                        ))
                      ) : (
                        <div>Not Data...</div>
                      )
                    ) : (
                      <div>Progress...</div>
                    )}
                  </div>
                  {/* <p className="text-danger">{errors.serGroup?.message}</p> */}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getServiceById.table,
  dataSerGroup: state.getServiceGroups.table,
  loading: state.getServiceById.loading,
  dataSearch: state.searchService.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetServiceById);
