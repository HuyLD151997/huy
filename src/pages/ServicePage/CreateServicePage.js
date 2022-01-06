import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createServiceApi } from "../../apis/Service/CreateService";
import { NavLink, Link, useParams } from "react-router-dom";
import * as getServiceGroupsAction from "../../actions/ServicesGroup/GetServiceGroups";
import { useStateValue } from "../../common/StateProvider/StateProvider";

const CreateServiceItem = (props) => {
  const [serGroup, setSerGroup] = useState("");
  const [idSerGroup, setIdSerGroup] = useState("");
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const { id } = useParams();
  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(getServiceGroupsAction.getServiceGroups(page, perPage));
  }, [page, perPage, loading1]);
  const { data, loading } = props;
  const handleGetSerGroup = (id, description) => {
    console.log("description" + description);
    setIdSerGroup(id);
    setSerGroup(description);
  };
  const validationSchema = yup
    .object({
      description: yup.string().required("Vui lòng nhập tên dịch vụ"),
      estiamtedMinutes: yup
        .number()
        .typeError("Vui lòng nhập thời gian làm")
        .required("Vui lòng nhập thời gian làm"),
      unitPrice: yup
        .number()
        .typeError("Vui lòng nhập là giá tiền")
        .required("Vui lòng nhập giá tiền"),
      type: yup
        .string()
        .required("Phải chọn một trong hai cái có sẵn")
        .matches(/(AREA|QUANTITY)/, "Chỉ được chọn một trong hai cái có sẵn"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateService = async (
    unitPrice,
    serviceGroupId,
    description,
    estiamtedMinutes,
    type
  ) => {
    try {
      await createServiceApi({
        unitPrice,
        canInputQuantity: true,
        serviceGroupId,
        description,
        estiamtedMinutes,
        type,
      });
      Swal.fire({
        icon: "success",
        text: "Tạo dịch vụ thành công !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/service-group");
    } catch (er) {
      console.log(er);
      Swal.fire({
        icon: "error",
        text: er.response.data,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const submitForm = (data) => {
    // console.log(typeof data.phoneNumber.toString());
    var priceNumber = parseInt(data.unitPrice);

    if (idSerGroup !== "") {
      handleCreateService(
        priceNumber,
        idSerGroup,
        data.description,
        data.estiamtedMinutes,
        data.type
      );
    } else {
      Swal.fire({
        icon: "error",
        text: "Dich vu khong duoc de trong",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <div className="container p-0 mt-2">
        <h3 className="">Thêm dịch vụ</h3>
        <div
          className=" border border-warning ml-5"
          // style={{ width: "400px", paddingLeft: "60px", padding: "20px" }}
        >
          <form
            className="border-0 row col-10 ml-5 mt-4 mb-4"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="col-12">
              <div className="row-12">
                <div className="form-group">
                  <label>Tên dịch vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("description")}
                  />
                  <p className="text-danger">{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Thời gian làm</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("estiamtedMinutes")}
                  />
                  <p className="text-danger">
                    {errors.estiamtedMinutes?.message}
                  </p>
                </div>
                <div className="form-group">
                  <label>Loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("type")}
                  >
                    <option selected> Chọn</option>
                    <option value="AREA">AREA</option>
                    <option value="QUANTITY">QUANTITY</option>
                  </select>
                  <p className="text-danger">{errors.type?.message}</p>
                </div>
                <div className="dropdown show" style={{ marginTop: "35px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle col-12"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ paddingLeft: "95px", paddingRight: "95px" }}
                  >
                    {serGroup === "" ? "Nhóm dịch vụ" : serGroup}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {data ? (
                      data.data.length > 0 ? (
                        data.data.map((item, index) => (
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
                      ) : null
                    ) : (
                      <div>Progress...</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Giá cả</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("unitPrice")}
                  />
                  <p className="text-danger">{errors.unitPrice?.message}</p>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-warning col-12"
                    style={{
                      marginTop: "35px",
                    }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.getServiceGroups.table,
  loading: state.getServiceById.loading,
});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateServiceItem);
