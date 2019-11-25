import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = ({ employees, location }) => {
  const totalPages = Math.ceil(employees.count / 50);
  console.log(totalPages);
  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    // links.push(<NavLink to={`/api/employees/${i - 1}`}>{i}</NavLink>);
    links.push(i);
  }
  console.log(links);
  const pageNum = location.pathname.slice(1) * 1;

  return (
    <nav>
      <Link to={`/${pageNum - 1}`}>Previous</Link>
      {links.map(link => (
        <Link to={`/${link - 1}`}>{link}</Link>
      ))}
      <Link to={`/${pageNum + 1}`}>Next</Link>
    </nav>
  );
};
export default NavBar;
