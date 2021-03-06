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
                        Tr???ng th??i ??ang{" "}
                        {item.isDisable === true ? "b??? kh??a" : "ho???t ?????ng"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-8">
                  <ul className="list-group list-group-flush">
                    {item.employeeCode !== null ? (
                      <li className="list-group-item">
                        M?? nh??n vi??n: <span>{item.employeeCode}</span>
                      </li>
                    ) : null}
                    {/* <li className="list-group-item">
                      M?? nh??n vi??n:{" "}
                      {item.userName !== null ? (
                        <span>{item.employeeCode}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li> */}
                    <li className="list-group-item">
                      T??n t??i kho???n:{" "}
                      {item.userName !== null ? (
                        <span>{item.userName}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      H??? v?? t??n:{" "}
                      {item.fullname !== null ? (
                        <span>{item.fullname}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      ?????a ch???:{" "}
                      {item.address !== null ? (
                        <span>{item.address}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
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
                      Gi???i t??nh:
                      {item.gender !== null ? (
                        <span>{item.gender}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Ng??y t???o / gi??? t???o:&nbsp;
                      {item.dateCreated ? (
                        <span>
                          {moment(item.dateCreated).format("DD/MM/YYYY")}
                          &nbsp;/ {item.dateCreated.substring(11, 16)}
                        </span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Ng??y c???p nh???t / gi??? c???p nh???t:&nbsp;
                      {item.dateUpdated ? (
                        <span>
                          {moment(item.dateUpdated).format("DD/MM/YYYY")}
                          &nbsp;/ {item.dateUpdated.substring(11, 16)}
                        </span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Email: {item.email}{" "}
                      {item.emailConfirmed === true ? (
                        <i class="fa fa-check-circle btn btn-success">
                          ???? x??c nh???n
                        </i>
                      ) : (
                        <span className="btn btn-warning ">
                          Ch??a x??c nh???n
                          <i class="fa fa-times-circle ml-2"></i>
                        </span>
                      )}
                    </li>
                    <li className="list-group-item">
                      S??? ??i???n tho???i:
                      {item.phoneNumber !== null ? (
                        <span>{item.phoneNumber}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </li>
                    {item.employeeCredit !== null ? (
                      <li className="list-group-item">
                        ??i???m nh??n vi??n:
                        <span>{item.employeeCredit} ??i???m</span>
                      </li>
                    ) : null}
                    {/* <li className="list-group-item">
                      ??i???m nh??n vi??n:
                      {item.employeeCredit !== null ? (
                        <span>{item.employeeCredit} ??i???m</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
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
