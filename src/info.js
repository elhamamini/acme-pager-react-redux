import React from 'react';
import { fetchEmployees } from './store.js';
class Info extends React.Component {
  constructor(props) {
    super();
  }

  componentDidUpdate(prev) {
    const { location } = this.props;
    const currentpage = location.pathname.slice(1) * 1;
    const prevPage = prev.location.pathname.slice(1) * 1;
    if (prevPage !== currentpage) {
      fetchEmployees(currentpage);
    }
  }
  componentDidMount() {
    const { location } = this.props;

    const idPage = location.pathname.slice(1) * 1;
    fetchEmployees(idPage);
  }
  render() {
    const { employees, location } = this.props;
    console.log('employees', employees);
    console.log('employees.rows', employees.rows);
    const idPage = location.pathname.slice(1) * 1;
    const rows = employees.rows;

    return (
      <table>
        <tr id="table-header">
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Title</th>
        </tr>
        {employees.rows &&
          employees.rows.map(employee => {
            return (
              <tr class="user">
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.title}</td>
              </tr>
            );
          })}
      </table>
    );
  }
}
export default Info;
