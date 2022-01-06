import React, { Component } from "react";

class ServiceList extends Component {
  render() {
    return (
      <div>
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Status</th>
              <th>Unit Price</th>
              <th>Date Created</th>
              <th>Date Updated</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}

export default ServiceList;
