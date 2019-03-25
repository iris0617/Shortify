import React, { Component } from "react";
import TableHeader from "./tableheader";
import TableBody from "./tablebody";
class Table extends Component {
  render() {
    const { columns, sortColumn, onSort, data } = this.props;
    console.log(data);
    return (
      <table className="table table-dark">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
