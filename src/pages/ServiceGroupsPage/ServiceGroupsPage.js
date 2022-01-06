import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getServiceGroupsActions from "../../actions/ServicesGroup/GetServiceGroups";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteServiceGroupApi } from "../../apis/ServiceGroup/DeleteServiceGroup";
import { updateServiceGroupApi } from "../../apis/ServiceGroup/UpdateServiceGroup";
import { updateServiceGroupStatusApi } from "../../apis/ServiceGroup/UpdateServiceGroupStatus";
import { updateImgServiceGroupApi } from "../../apis/ServiceGroup/UpdateImgServiceGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";
import * as getServiceGroupSearchActions from "../../actions/ServicesGroup/SearchServiceGroup";

const ServiceGroupsPage = (props) => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [idService, setIdService] = useState("");
  const [selectedImages, setSelectedImage] = useState([]);
  const [imgSelect, setImgSelect] = useState("");
  const [imgSelect2, setImgSelect2] = useState(null);
  const [search, setSearch] = useState("");
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageServiceGroup = localStorage.getItem("TotalPageServiceGroup");
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getServiceGroupsActions.getServiceGroups(page, perPage));
  }, [page, perPage, loading1]);
  const { data, loading, dataSearch } = props;
  console.log(data);

  const handleSearch = () => {
    if (search === "") {
      dispatchAction(
        getServiceGroupSearchActions.searchServiceGroup(page, perPage, " ")
      );
    }
    dispatchAction(
      getServiceGroupSearchActions.searchServiceGroup(page, perPage, search)
    );
  };

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

  const handleOnClickDelete = (id) => {
    handleDelete(id);
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
      await deleteServiceGroupApi(id);
      Swal.fire({
        icon: "success",
        text: "Xóa nhóm dịch vụ thành công",
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

  const handleUpdateServiceName = async (id, description, type) => {
    try {
      console.log(data);
      await updateServiceGroupApi(id, { description, type });
      Swal.fire({
        icon: "success",
        text: "Cập nhật thành công",
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

  const submitForm2 = (e) => {
    handleUpdateImgCleaningTool(imgSelect, imgSelect2);
  };

  const handleUpdateImgCleaningTool = async (id, File) => {
    try {
      console.log(data);
      await updateImgServiceGroupApi(id, { File });
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

  const handleActive = (id) => {
    handleUpdateServiceGroupStatus(id);
  };

  const handleUpdateServiceGroupStatus = async (id) => {
    try {
      await updateServiceGroupStatusApi(id);
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
  const handleGetAndUpdateImg = (id) => {
    setImgSelect(id);
  };

  const handleUpdateServiceImg = async (id, File) => {
    try {
      console.log(data);
      await updateImgServiceGroupApi(id, { File });
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
      description: yup
        .string()
        .stripEmptyString("Tên dịch vụ không được để trống")
        .default(description),
      type: yup
        .string()
        .stripEmptyString("Loại không được để trống")
        .matches(
          /(NORMAL|OVERALL|OPTIONAL)/,
          "Chỉ được chọn một trong ba cái có sẵn"
        )
        .default(type),
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

  const handleGetDescription = (description, id, type) => {
    setDescription(description);
    setIdService(id);
    setType(type);
  };

  const submitForm = (data) => {
    handleUpdateServiceName(idService, data.description, data.type);
  };

  const updateImg = (data) => {
    handleUpdateServiceImg(idService, data.file);
  };

  const handleFile = (e) => {
    const content = e.target.result;
    console.log("file content", content);
    // You can set content in state and show it in render.
  };

  const handleChangeFile = (e) => {
    if (e.target.files) {
      setImgSelect2(e.target.files[0]);
      setSelectedImage([]);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (src) => {
    return src.map((photo) => {
      return (
        <img
          style={{
            width: "50px",
            height: "50px",
            // borderRadius: "50%",
            marginRight: "5px",
            marginBottom: "5px",
          }}
          src={photo}
          key={photo}
        />
      );
    });
  };

  return (
    <div className="container table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Thông tin nhóm dịch vụ</h2>

        <Link
          type="button"
          to="/add-service"
          className="btn btn-warning btn-lg ml-auto mr-3"
        >
          Tạo loại dịch vụ
        </Link>
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
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">Hình</th>
              <th scope="col">Dịch vụ</th>
              <th scope="col">Loại</th>
              <th scope="col">Ngày/Giờ tạo</th>
              <th scope="col">Ngày/Giờ cập nhật</th>
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
                      <tr className="" key={index}>
                        <td className="col-1">
                          {item.hasImage ? (
                            <img
                              src={`http://api.beclean.store/api/ServiceGroup/Image/${item.hasImage}`}
                              style={{
                                width: "50px",
                                height: "50px",
                                // borderRadius: "50%",
                                marginRight: "5px",
                                marginBottom: "5px",
                              }}
                            />
                          ) : (
                            <span>Chưa có</span>
                          )}

                          <i
                            class="fa fa-edit"
                            type="button"
                            onClick={() => handleGetAndUpdateImg(item.hasImage)}
                            data-toggle="modal"
                            data-target="#exampleModal2"
                            data-whatever="yah"
                            style={{
                              fontSize: "20px",
                              margin: "auto",
                              marginTop: "8px",
                              position: "absolute",
                              bottom: "7px",
                              right: "15px",
                            }}
                          ></i>
                          {/* </form> */}
                        </td>
                        <td className="col-2 align-middle">
                          {item.description !== null ? (
                            <span>{item.description}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="col-1 align-middle">
                          {item.type !== null ? (
                            <span>{item.type}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="col-2 align-middle">
                          {item.dateCreated ? (
                            <span>
                              {moment(item.dateCreated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateCreated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="col-2 align-middle">
                          {item.dateUpdated ? (
                            <span>
                              {moment(item.dateUpdated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateUpdated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>

                        <td className="col-2 align-middle">
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

                        <td className="col-2 align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-unlock-alt text-success"
                              type="button"
                              style={{ fontSize: "30px", marginTop: "15px" }}
                              onClick={() => handleActive(item.id)}
                            ></i>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-lock text-danger"
                              type="button"
                              style={{
                                fontSize: "30px",
                                marginTop: "15px",
                              }}
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
                          <Link
                            style={{
                              fontSize: "30px",
                              margin: "auto",
                              marginLeft: "20px",
                            }}
                            type="button"
                            to={`detail-service-group/${item.id}`}
                            //style={{ paddingLeft: "55px", paddingRight: "55px" }}
                          >
                            <i class="fa fa-ellipsis-v text-muted"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : search !== "" && dataSearch.total !== 0 ? (
                  dataSearch.data.map((item, index) => (
                    <tbody>
                      <tr className="" key={index}>
                        <td className="col-1">
                          {item.hasImage ? (
                            <img
                              src={`http://api.beclean.store/api/ServiceGroup/Image/${item.hasImage}`}
                              style={{
                                width: "50px",
                                height: "50px",
                                // borderRadius: "50%",
                                marginRight: "5px",
                                marginBottom: "5px",
                              }}
                            />
                          ) : (
                            <span>Chưa có</span>
                          )}

                          <i
                            class="fa fa-edit"
                            type="button"
                            onClick={() => handleGetAndUpdateImg(item.hasImage)}
                            data-toggle="modal"
                            data-target="#exampleModal2"
                            data-whatever="yah"
                            style={{
                              fontSize: "20px",
                              margin: "auto",
                              marginTop: "8px",
                              position: "absolute",
                              bottom: "7px",
                              right: "15px",
                            }}
                          ></i>
                          {/* </form> */}
                        </td>
                        <td className="col-2 align-middle">
                          {item.description !== null ? (
                            <span>{item.description}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="col-1 align-middle">
                          {item.type !== null ? (
                            <span>{item.type}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="col-2 align-middle">
                          {item.dateCreated ? (
                            <span>
                              {moment(item.dateCreated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateCreated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="col-2 align-middle">
                          {item.dateUpdated ? (
                            <span>
                              {moment(item.dateUpdated).format("DD/MM/YYYY")}
                              &nbsp;/ {item.dateUpdated.substring(11, 16)}
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>

                        <td className="col-2 align-middle">
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

                        <td className="col-2 align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-unlock-alt text-success"
                              type="button"
                              style={{ fontSize: "30px", marginTop: "15px" }}
                              onClick={() => handleActive(item.id)}
                            ></i>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <i
                              class="fa fa-lock text-danger"
                              type="button"
                              style={{
                                fontSize: "30px",
                                marginTop: "15px",
                              }}
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
                          <Link
                            style={{
                              fontSize: "30px",
                              margin: "auto",
                              marginLeft: "20px",
                            }}
                            type="button"
                            to={`detail-service-group/${item.id}`}
                            //style={{ paddingLeft: "55px", paddingRight: "55px" }}
                          >
                            <i class="fa fa-ellipsis-v text-muted"></i>
                          </Link>
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
                    <tr className="" key={index}>
                      <td className="col-1">
                        {item.hasImage ? (
                          <img
                            src={`http://api.beclean.store/api/ServiceGroup/Image/${item.hasImage}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              // borderRadius: "50%",
                              marginRight: "5px",
                              marginBottom: "5px",
                            }}
                          />
                        ) : (
                          <span>Chưa có</span>
                        )}

                        <i
                          class="fa fa-edit"
                          type="button"
                          onClick={() => handleGetAndUpdateImg(item.hasImage)}
                          data-toggle="modal"
                          data-target="#exampleModal2"
                          data-whatever="yah"
                          style={{
                            fontSize: "20px",
                            margin: "auto",
                            marginTop: "8px",
                            position: "absolute",
                            bottom: "7px",
                            right: "15px",
                          }}
                        ></i>
                        {/* </form> */}
                      </td>
                      <td className="col-2 align-middle">
                        {item.description !== null ? (
                          <span>{item.description}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="col-1 align-middle">
                        {item.type !== null ? (
                          <span>{item.type}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="col-2 align-middle">
                        {item.dateCreated ? (
                          <span>
                            {moment(item.dateCreated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateCreated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="col-2 align-middle">
                        {item.dateUpdated ? (
                          <span>
                            {moment(item.dateUpdated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateUpdated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>

                      <td className="col-2 align-middle">
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

                      <td className="col-2 align-middle">
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <i
                            class="fa fa-unlock-alt text-success"
                            type="button"
                            style={{ fontSize: "30px", marginTop: "15px" }}
                            onClick={() => handleActive(item.id)}
                          ></i>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <i
                            class="fa fa-lock text-danger"
                            type="button"
                            style={{
                              fontSize: "30px",
                              marginTop: "15px",
                            }}
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
                        <Link
                          style={{
                            fontSize: "30px",
                            margin: "auto",
                            marginLeft: "20px",
                          }}
                          type="button"
                          to={`detail-service-group/${item.id}`}
                          //style={{ paddingLeft: "55px", paddingRight: "55px" }}
                        >
                          <i class="fa fa-ellipsis-v text-muted"></i>
                        </Link>
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
          count={Math.ceil(totalPageServiceGroup / perPage)}
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
                Cập nhật nhóm dịch vụ
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
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
                    Tên dịch vụ:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("description")}
                    defaultValue={description}
                  />
                  <p>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("type")}
                    defaultValue={type}
                  >
                    <option selected>{type}</option>
                    {type === "NORMAL" ? (
                      <>
                        <option value="OVERALL">OVERALL</option>
                        <option value="OPTIONAL">OPTIONAL</option>
                      </>
                    ) : type === "OVERALL" ? (
                      <>
                        <option value="NORMAL">NORMAL</option>
                        <option value="OPTIONAL">OPTIONAL</option>
                      </>
                    ) : (
                      <>
                        <option value="NORMAL">NORMAL</option>
                        <option value="OVERALL">OVERALL</option>
                      </>
                    )}
                    {/* <option value="NORMAL">NORMAL</option>
                    <option value="OVERALL">OVERALL</option>
                    <option value="OPTIONAL">OPTIONAL</option> */}
                  </select>
                  <p>{errors.type?.message}</p>
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
      <div
        className="modal fade mt-5"
        id="exampleModal2"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100" id="exampleModalLabel2">
                Cập nhật hình
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" style={{ float: "right" }}>
                  ×
                </span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    name="img-upload"
                    onChange={handleChangeFile}
                  />
                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload">
                      Chọn hình
                    </label>
                  </div>
                  <div className="result">{renderPhotos(selectedImages)}</div>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitForm2}
                >
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
  data: state.getServiceGroups.table,
  loading: state.getServiceGroups.loading,
  dataSearch: state.searchServiceGroup.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ServiceGroupsPage));
