import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getCleaningToolsActions from "../../actions/CleaningTool/GetCleaningTool";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCleaningToolApi } from "../../apis/CleaningTool/DeleteCleaningTool";
import { updateCleaningToolApi } from "../../apis/CleaningTool/UpdateCleaningTool";
import { updateQuantityCleaningToolApi } from "../../apis/CleaningTool/UpdateQuantityCleaningTool";
import { updateCleaningToolStatusApi } from "../../apis/CleaningTool/UpdateCleaningToolStatus";
import { updateCleaningToolImgApi } from "../../apis/CleaningTool/UpdateCleaningToolImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";
import * as getCleaningToolsSearchActions from "../../actions/CleaningTool/SearchCleaningTool";

const CleaningToolPage = (props) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [idService, setIdService] = useState("");
  const [selectedImages, setSelectedImage] = useState([]);
  const [imgSelect, setImgSelect] = useState("");
  const [imgSelect2, setImgSelect2] = useState(null);
  const [search, setSearch] = useState("");
  const dispatchAction = useDispatch();
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageCleaningTool = localStorage.getItem("TotalPageCleaningTool");
  useEffect(() => {
    dispatchAction(getCleaningToolsActions.getCleaningTools(page, perPage));
  }, [page, perPage, loading1]);
  const { data, loading, dataSearch } = props;

  const handleSearch = () => {
    console.log(search);
    if (search === "") {
      dispatchAction(
        getCleaningToolsSearchActions.searchCleaningTool(page, perPage, " ")
      );
    }
    dispatchAction(
      getCleaningToolsSearchActions.searchCleaningTool(page, perPage, search)
    );
  };
  console.log(dataSearch);
  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
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
      await deleteCleaningToolApi(id);
      Swal.fire({
        icon: "success",
        text: "Xóa dụng cụ thành công",
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
      console.log(id);
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
  const handleActive = (id) => {
    handleUpdateCleaningToolStatus(id);
  };

  const handleUpdateCleaningToolStatus = async (id) => {
    try {
      await updateCleaningToolStatusApi(id);
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

  const submitForm2 = (e) => {
    // console.log(imgSelect2);
    handleUpdateImgCleaningTool(imgSelect, imgSelect2);
    // console.log(imgSelect);
    // console.log(imgSelect2);
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
      quantity: yup
        .string()
        .stripEmptyString("Số lượng không được để trống")
        .default(quantity.toString()),
      quantity2: yup
        .string()
        .stripEmptyString("Số lượng không được để trống")
        .default(quantity.toString()),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGetDescription = (description, id, quantity) => {
    console.log("Get description");
    setDescription(description);
    setIdService(id);
    setQuantity(quantity);
  };

  const handleGetDescription2 = (id) => {
    setIdService(id);
  };

  const submitForm = (dataSubmit) => {
    var quantity = parseInt(dataSubmit.quantity);
    handleUpdateServiceName(idService, dataSubmit.description, quantity);
  };

  const submitForm3 = (dataSubmit) => {
    var quantity = parseInt(dataSubmit.quantity2);
    console.log(idService);
    console.log(quantity);
    if (quantity > 0) {
      handleUpdateQuantity(idService, quantity);
    } else {
      Swal.fire({
        icon: "error",
        text: "Số lượng phải lớn hơn 0",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      console.log(id);
      await updateQuantityCleaningToolApi(id, quantity);
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

  const handleChangeFile = (e) => {
    if (e.target.files) {
      setImgSelect2(e.target.files[0]);
      setSelectedImage([]);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
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
        <h2>Thông tin dụng cụ</h2>

        <Link
          type="button"
          to="/create-cleaning-tool"
          className="btn btn-warning btn-lg ml-auto mr-3"
        >
          Tạo mới dụng cụ
        </Link>
      </div>
      <div>
        <form className="input-group mb-3 border-0" style={{ width: "500px" }}>
          <input
            className="ml-auto form-control"
            type="text"
            placeholder="Tìm kiếm dụng cụ"
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

        <table className="table align-middle mt-2">
          <thead className="table-light">
            <tr>
              <th scope="col">Hình</th>
              <th scope="col">Dụng cụ</th>
              <th scope="col">Số lượng</th>
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
                      <tr key={index} className="">
                        <td className="col-1">
                          {item.hasImage ? (
                            <img
                              src={`http://api.beclean.store/api/CleaningTool/Image/${item.hasImage}`}
                              style={{
                                width: "30px",
                                height: "30px",

                                marginRight: "5px",
                                marginBottom: "5px",
                              }}
                            />
                          ) : (
                            <img
                              src="data:image/jpeg;base64,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"
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                marginRight: "5px",
                                marginBottom: "5px",
                              }}
                            />
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
                              // margin: "auto",
                              marginTop: "8px",
                              // position: "absolute",
                              bottom: "7px",
                              right: "15px",
                            }}
                          ></i>
                        </td>
                        <td className="col-2 align-middle">
                          {item.description !== null ? (
                            <span>{item.description}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.quantity !== null ? (
                            <div>
                              <span>{item.quantity}</span>
                              <i
                                class="fa fa-plus-circle"
                                type="button"
                                onClick={() => handleGetDescription2(item.id)}
                                data-toggle="modal"
                                data-target="#exampleModal4"
                                data-whatever="yah"
                                style={{
                                  fontSize: "20px",
                                  // margin: "auto",
                                  //marginTop: "8px",
                                  // position: "absolute",
                                  // bottom: "7px",
                                  // right: "15px",
                                }}
                              ></i>
                            </div>
                          ) : (
                            <span>Chưa có dữ liệu</span>
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
                        <td className="align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <span className="text-danger border border-danger rounded p-1">
                              Hết sử dụng
                            </span>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <span className="text-success border border-success rounded p-1">
                              Sử dụng
                            </span>
                          )}
                        </td>
                        <td className="p-0 align-middle">
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
                                item.quantity
                              )
                            }
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
                  ))
                ) : search !== "" && dataSearch.total !== 0 ? (
                  dataSearch.data.map((item, index) => (
                    <tbody>
                      <tr key={index} className="">
                        <td className="col-1">
                          {item.hasImage ? (
                            <img
                              src={`http://api.beclean.store/api/CleaningTool/Image/${item.hasImage}`}
                              style={{
                                width: "30px",
                                height: "30px",

                                marginRight: "5px",
                                marginBottom: "5px",
                              }}
                            />
                          ) : (
                            <img
                              src="data:image/jpeg;base64,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"
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                marginRight: "5px",
                                marginBottom: "5px",
                              }}
                            />
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
                              // margin: "auto",
                              marginTop: "8px",
                              // position: "absolute",
                              bottom: "7px",
                              right: "15px",
                            }}
                          ></i>
                        </td>
                        <td className="col-2 align-middle">
                          {item.description !== null ? (
                            <span>{item.description}</span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
                          )}
                        </td>
                        <td className="align-middle">
                          {item.quantity !== null ? (
                            <span>
                              {item.quantity}
                              <i
                                class="fa fa-plus-circle"
                                type="button"
                                onClick={() => handleGetDescription2(item.id)}
                                data-toggle="modal"
                                data-target="#exampleModal4"
                                data-whatever="yah"
                                style={{
                                  fontSize: "20px",
                                  // margin: "auto",
                                  //marginTop: "8px",
                                  // position: "absolute",
                                  // bottom: "7px",
                                  // right: "15px",
                                }}
                              ></i>
                            </span>
                          ) : (
                            <span>Chưa có dữ liệu</span>
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
                        <td className="align-middle">
                          {item.isDisable === false ? (
                            ""
                          ) : (
                            <span className="text-danger border border-danger rounded p-1">
                              Hết sử dụng
                            </span>
                          )}
                          {item.isDisable === true ? (
                            ""
                          ) : (
                            <span className="text-success border border-success rounded p-1">
                              Sử dụng
                            </span>
                          )}
                        </td>
                        <td className="p-0 align-middle">
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
                                item.quantity
                              )
                            }
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
                  ))
                ) : (
                  <div>Không tìm thấy kết quả</div>
                )
              ) : (
                data.data.map((item, index) => (
                  <tbody>
                    <tr key={index} className="">
                      <td className="col-1">
                        {item.hasImage ? (
                          <img
                            src={`http://api.beclean.store/api/CleaningTool/Image/${item.hasImage}`}
                            style={{
                              width: "30px",
                              height: "30px",

                              marginRight: "5px",
                              marginBottom: "5px",
                            }}
                          />
                        ) : (
                          <img
                            src="data:image/jpeg;base64,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"
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              marginRight: "5px",
                              marginBottom: "5px",
                            }}
                          />
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
                            // margin: "auto",
                            marginTop: "8px",
                            // position: "absolute",
                            bottom: "7px",
                            right: "15px",
                          }}
                        ></i>
                      </td>
                      <td className="col-2 align-middle">
                        {item.description !== null ? (
                          <span>{item.description}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.quantity !== null ? (
                          <span>
                            {item.quantity}
                            <i
                              class="fa fa-plus-circle"
                              type="button"
                              onClick={() => handleGetDescription2(item.id)}
                              data-toggle="modal"
                              data-target="#exampleModal4"
                              data-whatever="yah"
                              style={{
                                fontSize: "20px",
                                // margin: "auto",
                                //marginTop: "8px",
                                // position: "absolute",
                                // bottom: "7px",
                                // right: "15px",
                              }}
                            ></i>
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
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
                      <td className="align-middle">
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <span className="text-danger border border-danger rounded p-1">
                            Hết sử dụng
                          </span>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <span className="text-success border border-success rounded p-1">
                            Sử dụng
                          </span>
                        )}
                      </td>
                      <td className="p-0 align-middle">
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
                              item.quantity
                            )
                          }
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
          count={Math.ceil(totalPageCleaningTool / perPage)}
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
                Cập nhật dụng cụ
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
                    Tên dụng cụ:
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
                  <label htmlFor="recipient-name" className="col-form-label">
                    Số lượng:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="recipient-name"
                    {...register("quantity")}
                    defaultValue={quantity}
                  />
                  <p>{errors.quantity?.message}</p>
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
            {/* onSubmit={handleSubmit(submitForm2)} */}
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    name="img-upload"
                    onChange={handleChangeFile}
                    accept="image/x-png,image/gif,image/jpeg"
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
      <div
        className="modal fade mt-5"
        id="exampleModal4"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel4"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100" id="exampleModalLabel4">
                Thêm số lượng dụng cụ
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
            <form onSubmit={handleSubmit(submitForm3)}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Số lượng:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="recipient-name"
                    {...register("quantity2")}
                  />
                  <p>{errors.quantity2?.message}</p>
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
                  Thêm
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
  data: state.cleaningTool.table,
  loading: state.cleaningTool.loading,
  dataSearch: state.searchCleaningTool.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(CleaningToolPage));
