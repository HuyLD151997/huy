import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createCleaningToolApi } from "../../apis/CleaningTool/CreateCleaningTool";
import { NavLink, Link, useParams } from "react-router-dom";

const CreateService = (props) => {
  const dispatchAction = useDispatch();
  // useEffect(() => {
  //   dispatchAction();
  // }, []);
  const validationSchema = yup
    .object({
      Description: yup.string().required("Vui lòng nhập tên dụng cụ"),
      ImageFile: yup.mixed().required("File is required"),
      Quantity: yup
        .number()
        .typeError("Số lượng không được để trống")
        .required("Số lượng không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateService = async (Description, ImageFile, Quantity) => {
    try {
      await createCleaningToolApi({
        Description,
        ImageFile,
        Quantity,
      });
      Swal.fire({
        icon: "success",
        text: "Tạo dụng cụ thành công !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/cleaning-tool");
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

    handleCreateService(data.Description, data.ImageFile, data.Quantity);
  };

  return (
    <div>
      <div className="container mr-5">
        <h3 className="">Thêm dụng cụ</h3>
        <div className=" border border-warning p-4">
          <form className="border-0 row" onSubmit={handleSubmit(submitForm)}>
            <div className="col-12">
              <div className="col-12">
                <div className="form-group">
                  <label>Tên dụng cụ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("Description")}
                  />
                  <p className="text-danger">{errors.Description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("Quantity")}
                  />
                  <p className="text-danger">{errors.Quantity?.message}</p>
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
const mapStateToProps = (state) => ({});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateService);
