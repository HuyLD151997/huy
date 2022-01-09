import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getChartsActions from "../actions/Chart/GetChart";
import * as getChartTransactinonActions from "../actions/Chart/GetChartTransaction";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { Doughnut, Bar } from "react-chartjs-2";

const ChartPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getChartsActions.getCharts());
    dispatchAction(getChartTransactinonActions.getChartTransaction());
  }, []);
  const { data, dataTransaction } = props;

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

  const dateListRender = () => {
    var dateList = [];
    if (dataTransaction) {
      for (let index = 0; index < dataTransaction.length; index++) {
        dateList.push(moment(dataTransaction[index].date).format("DD/MM/YYYY"));
      }
    }
    return dateList;
  };
  const totalListRender = () => {
    var totalList = [];
    if (dataTransaction) {
      for (let index = 0; index < dataTransaction.length; index++) {
        totalList.push(dataTransaction[index].total);
      }
    }
    return totalList;
  };

  return (
    <div className="container p-0 mt-2">
      <div className="row ">
        <span
          style={{
            fontWeight: "bold",
            // marginLeft: "10px",
            fontSize: "24px",
          }}
        >
          Biểu đồ đặt lịch
        </span>
        {data ? (
          <div className="col-4 m-auto">
            <Doughnut
              data={{
                labels: [
                  `${data.bookingWaiting.name}`,
                  `${data.bookingDone.name}`,
                  `${data.bookingCancelled.name}`,
                  `${data.bookingOther.name}`,
                ],
                datasets: [
                  {
                    label: "Population (millions)",
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      // "#c45850",
                    ],
                    data: [
                      `${data.bookingWaiting.quantity}`,
                      `${data.bookingDone.quantity}`,
                      `${data.bookingCancelled.quantity}`,
                      `${data.bookingOther.quantity}`,
                    ],
                  },
                ],
              }}
              option={{
                title: {
                  display: true,
                  text: "Predicted world population (millions) in 2050",
                },
              }}
            />
          </div>
        ) : (
          <div>Progress .....</div>
        )}
      </div>
      <div>
        <span
          style={{
            fontWeight: "bold",
            // marginLeft: "500px",
            fontSize: "24px",
          }}
        >
          Biểu đồ giao dịch
        </span>
        <Bar
          data={{
            labels: dateListRender(),
            datasets: [
              {
                label: "Doanh thu trong ngày",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#3e95cd",
                  "#8e5ea2",
                ],
                data: totalListRender(),
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "Doanh thu trong ngày",
            },
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getChart.table,
  dataTransaction: state.getChartTransaction.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ChartPage));
