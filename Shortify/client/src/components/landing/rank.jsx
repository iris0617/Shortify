import React, { Component } from "react";
import Table from "../common/table";

class Rank extends Component {
  columns = [
    {
      path: "originalUrl",
      label: "Original Url"
    },
    { path: "shortUrl", label: "Shortend Url" },
    { path: "updatedAt", label: "Last Visit" },
    { path: "clickCount", label: "Visit Count" }
  ];
  render() {
    const { data } = this.props;
    return <Table columns={this.columns} sortColumn="" onSort="" data={data} />;
  }
}

export default Rank;
