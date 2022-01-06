import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getAccountByIdAction from "../../actions/Employees/GetEmployById";
import * as putAvatarAction from "../../actions/Employees/PutAvatar";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";

const DetailAccount = (props) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const [picture, setPicture] = useState();

  useEffect(() => {
    dispatchAction(getAccountByIdAction.getEmployeeById(id));
  }, []);
  const { data, avatarCode } = props;
  console.log(data);

  const readFileDataAsBase64 = (e) => {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsBinaryString(file);
    });
  };

  const onChangePicture = (e) => {
    console.log("picture: ", e.target.files[0]);
    console.log(readFileDataAsBase64(e));
    // dispatchAction(putAvatarAction.putAvatar();
  };

  return (
    <div>
      {data ? (
        data.length > 0 ? (
          data.map((item, index) => (
            <div className="container p-0 mt-2">
              <div className="row">
                <div className="col-4">
                  <ul
                    className="list-group list-group-flush"
                    style={{ width: "270px" }}
                  >
                    <li className="list-group-item">
                      {item.hasAvatar ? (
                        <img
                          src={`http://api.beclean.store/api/Account/Avatar/${item.hasAvatar}`}
                          style={{
                            width: "250px",
                            height: "250px",
                            marginRight: "55px",
                            marginBottom: "5px",
                          }}
                        />
                      ) : (
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnq9pVEA16U0vH0nT0UeFY9vrTn99Za2a7QWub_dBpXSYTCZtBQULWaaRJ4ENFreEmPc&usqp=CAU"
                          style={{
                            width: "250px",
                            height: "250px",
                            marginRight: "55px",
                            marginBottom: "5px",
                          }}
                        />
                      )}
                    </li>
                    <li className="list-group-item">
                      {/* <input type="file" name="img-upload" /> */}
                      <span
                        className={
                          item.isDisable ? "btn btn-danger" : "btn btn-success"
                        }
                        //onClick={this.onUpdateStatus}
                      >
                        Trạng thái đang{" "}
                        {item.isDisable === true ? "bị khóa" : "hoạt động"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-8">
                  <ul className="list-group list-group-flush">
                    {item.employeeCode !== null ? (
                      <li className="list-group-item">
                        Mã nhân viên: <span>{item.employeeCode}</span>
                      </li>
                    ) : null}
                    {/* <li className="list-group-item">
                      Mã nhân viên:{" "}
                      {item.userName !== null ? (
                        <span>{item.employeeCode}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li> */}
                    <li className="list-group-item">
                      Tên tài khoản:{" "}
                      {item.userName !== null ? (
                        <span>{item.userName}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Họ và tên:{" "}
                      {item.fullname !== null ? (
                        <span>{item.fullname}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Địa chỉ:{" "}
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
                      .
                    </li>
                    <li className="list-group-item">
                      Giới tính:
                      {item.gender !== null ? (
                        <span>{item.gender}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Ngày tạo / giờ tạo:&nbsp;
                      {item.dateCreated ? (
                        <span>
                          {moment(item.dateCreated).format("DD/MM/YYYY")}
                          &nbsp;/ {item.dateCreated.substring(11, 16)}
                        </span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Ngày cập nhật / giờ cập nhật:&nbsp;
                      {item.dateUpdated ? (
                        <span>
                          {moment(item.dateUpdated).format("DD/MM/YYYY")}
                          &nbsp;/ {item.dateUpdated.substring(11, 16)}
                        </span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Email: {item.email}{" "}
                      {item.emailConfirmed === true ? (
                        <i class="fa fa-check-circle btn btn-success">
                          Đã xác nhận
                        </i>
                      ) : (
                        <span className="btn btn-warning ">
                          Chưa xác nhận
                          <i class="fa fa-times-circle ml-2"></i>
                        </span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Số điện thoại:
                      {item.phoneNumber !== null ? (
                        <span>{item.phoneNumber}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li>
                    {item.employeeCredit !== null ? (
                      <li className="list-group-item">
                        Điểm nhân viên:
                        <span>{item.employeeCredit} điểm</span>
                      </li>
                    ) : null}
                    {/* <li className="list-group-item">
                      Điểm nhân viên:
                      {item.employeeCredit !== null ? (
                        <span>{item.employeeCredit} điểm</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </li> */}
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
  );
};

const mapStateToProps = (state) => ({
  data: state.getEmployeeById.table,
  avatarCode: state.avatarStringCode.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(DetailAccount);
