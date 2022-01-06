import React, { Component } from "react";
import ServiceList from "./../../components/Services/ServiceList";
import ServiceItem from "./../../components/Services/ServiceItem";
import { connect } from "react-redux";

class ServiceListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    // apiCaller("services", "GET", null).then((res) => {
    //   this.setState({
    //     services: res.data,
    //   });
    // });
  }

  render() {
    //var { services } = this.props;
    var { services } = this.state;

    return (
      <div>
        <div className="row mb-5">
          <div className="col-md-8">
            <a href="role-add.html" className="btn btn-primary">
              Add new
            </a>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control m-0"
                placeholder="Tìm kiếm..."
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <ServiceList>{this.showServices(services)}</ServiceList>
      </div>
    );
  }

  showServices(services) {
    var result = null;
    if (services.length > 0) {
      result = services.map((service, index) => {
        return <ServiceItem key={index} service={service} index={index} />;
      });
    }
    return result;
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
  };
};

export default connect(mapStateToProps, null)(ServiceListPage);
