import React, { Component } from "react";

class ServiceItem extends Component {
  render() {
    var { service, index } = this.props;
    var statusName = service.status ? "Active" : "Inactive";
    var statusClass = service.status ? "success" : "danger";
    return (
      <tr className="table-primary">
        <td>{index + 1}</td>
        <td className="pt-4">{service.description}</td>
        <td>
          <button className={`btn btn-${statusClass}`} type="button">
            {statusName}
          </button>
        </td>
        <td className="pt-4">{service.unitPrice}</td>
        <td className="pt-4">{service.dateCreated}</td>
        <td className="pt-4">{service.dateUpdated}</td>
        <td className="pt-4">
          <i className="fa fa-list" />
        </td>
      </tr>
    );
  }
}

export default ServiceItem;
