import React, { Component } from "react";

class ServiceActionPage extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group border-0">
            <label>Description</label>
            <input type="text" className="form-control" />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" />
              Active
            </label>
          </div>
          <div className="form-group">
            <label>Unit Price</label>
            <input type="number" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default ServiceActionPage;
