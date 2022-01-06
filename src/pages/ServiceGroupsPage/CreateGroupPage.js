import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createServiceGroupApi } from "../../apis/ServiceGroup/CreateServiceGroup";
import { NavLink, Link, useParams } from "react-router-dom";
import * as getServiceGroups from "../../actions/ServicesGroup/GetServiceGroups";

const CreateService = (props) => {
  const [serGroup, setSerGroup] = useState("");
  const [idSerGroup, setIdSerGroup] = useState(-1);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getServiceGroups.getServiceGroups());
  }, []);
  const validationSchema = yup
    .object({
      Description: yup.string().required("Vui lòng nhập tên loại dịch vụ"),
      Type: yup
        .string()
        .required("Loại không được để trống")
        .matches(
          /(NORMAL|OVERALL|OPTIONAL)/,
          "Chỉ được chọn một trong ba cái có sẵn"
        ),
      ImageFile: yup.mixed().required("File is required"),
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
    Description,
    // unitPrice,
    // canInputQuantity,
    // serviceGroupId,
    ImageFile,
    Type
  ) => {
    try {
      await createServiceGroupApi({
        Description,
        // unitPrice,
        // canInputQuantity,
        // serviceGroupId,
        ImageFile,
        Type,
      });
      Swal.fire({
        icon: "success",
        text: "Tạo nhóm dịch vụ thành công !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/service-group");
    } catch (er) {
      console.log(er);
      Swal.fire({
        icon: "error",
        text: "tạo thất bại",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const submitForm = (data) => {
    // console.log(typeof data.phoneNumber.toString());

    handleCreateService(data.Description, data.ImageFile, data.Type);
  };

  return (
    <div>
      <div className="container mr-5">
        <h3 className="">Thêm loại dịch vụ</h3>
        <div className=" border border-warning p-4">
          <form className="border-0 row" onSubmit={handleSubmit(submitForm)}>
            <div className="col-12">
              <div className="col-12">
                <div className="form-group">
                  <label>Tên loại dịch vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("Description")}
                  />
                  <p className="text-danger">{errors.Description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Thuộc loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("Type")}
                  >
                    <option selected>Chọn loại</option>
                    <option value="NORMAL">NORMAL</option>
                    <option value="OVERALL">OVERALL</option>
                    <option value="OPTIONAL">OPTIONAL</option>
                  </select>
                  <p className="text-danger">{errors.Type?.message}</p>
                </div>
                <div className="form-group">
                  <label>Hình ảnh</label>
                  <input type="file" {...register("ImageFile")} />
                  <p>{errors.ImageFile?.message}</p>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-warning "
                    style={{
                      width: "100%",
                      // marginLeft: "600px",
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
});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateService);
