import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getBookingLogAction from "../../actions/BookingLog/GetBookingLog";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const BookingLogPage = (props) => {
  const [description, setDescription] = useState("");
  const [idService, setIdService] = useState("");
  const { id } = useParams();

  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getBookingLogAction.getBookingLogs(id));
  }, []);
  const { data } = props;

  console.log(data);

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

  const _crop = () => {
    // image in dataUrl
    console.log(this.cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <div className="container">
      <h2 className="ml-5 mb-4" style={{ textAlign: "center" }}>
        Nhật ký làm việc
      </h2>
      <div>
        <div>
          {data ? (
            data.length > 0 ? (
              data.map((item, index) => (
                <div className="row mr-0">
                  <div className="col-2 mt-5">
                    <span>
                      {moment(item.dateCreated).format("DD-MM-YYYY")}
                      &nbsp;/ {item.dateCreated.substring(11, 16)}
                    </span>
                  </div>

                  <div
                    style={{ width: "100%", marginLeft: "14px" }}
                    className="col-9"
                  >
                    <div
                      className="circle col-1"
                      style={{
                        background: "#456BD9",
                        // border: "0.1875em solid #0F1C3F",
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                      }}
                    ></div>
                    <div
                      style={{
                        borderLeft: "1px solid ",
                        marginLeft: "14px",
                      }}
                    >
                      <ul style={{ listStyleType: "none" }}>
                        <div className="row ">
                          <div className="col-4 mt-3">
                            <li className="mb-2">
                              Trạng thái: {item.bookingStatusId}
                            </li>
                            <li>Ghi chú: {item.description}</li>
                          </div>
                          <div className="col-8 mt-3">
                            <li>
                              Hình ảnh:
                              <div className="row">
                                {item.bookingImages.length > 0 ? (
                                  item.bookingImages.map((itemImg, index) => (
                                    <div>
                                      <img
                                        className="d-block"
                                        src={`http://api.beclean.store/api/BookingLog/BookingImageReference/${itemImg.id}`}
                                        alt=""
                                        width="100px"
                                        height="100px"
                                      />
                                      <img
                                        className="d-block"
                                        width="100px"
                                        height="100px"
                                        alt=""
                                        src={`http://api.beclean.store/api/BookingLog/BookingImageEvidence/${itemImg.id}`}
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <span>Không có</span>
                                )}
                              </div>
                            </li>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : null
          ) : (
            <div>Progress .....</div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBookingLog.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(BookingLogPage));
