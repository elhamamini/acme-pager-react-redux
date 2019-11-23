import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, NavLink } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
const SET_EMPLOYEES = 'SET_EMPLOYESS';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const rootEl = document.querySelector('#root');
const reducer = combineReducers({
  employees: (state = [], action) => {
    if (action.type === SET_EMPLOYEES) {
      state = action.employees;
    } 
    // else if (action.type === DELETE_EMPLOYEE) {
    //   state = state.filter(employee => employee.id !== action.employee.id);
    // }

    return state;
  }
});
const store = createStore(reducer);

// const fetchEmployess = async () =>
//   store.dispatch({
//     type: "SET_EMPLOYEES",
//     employees: (await axios.get("/api/employees/:page?")).data
//   });
const creatEmployees = employees => {
  return {
    type: SET_EMPLOYEES,
    employees
  };
};
const fetchEmployess = id => {
  axios
    .get(`/api/employees/${id}`)
    // .get('/api/employees')
    .then(response => store.dispatch(creatEmployees(response.data)))
    .catch(e => console.log(e));
};
// const removeEmployee = employee => {
//   return {
//     type: DELETE_EMPLOYEE,
//     employee
//   };
// };
// const deletEmployees = employee => {
//   axios
//     .delete(`/api/employees/${employee.id}`)
//     .then(employee => store.dispatch(removeEmployee(employee)))
//     .catch(e => console.log(e));
// };
// const connect = Component => {
//   return class Connected extends React.Component {
//     constructor() {
//       super();
//       this.state = store.getState();
//     }
//     componentWillUnmount() {
//       this.unsubscribe;
//     }
//     componentDidMount() {
//       this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
//     }
//     render() {
//       return <Component {...this.state} {...this.props} />;
//     }
//   };
// };

const NavBar = ({ employees }) => {
  // console.log(props);

  // const page = location.params.page;

  const totalPages = Math.ceil(employees.count / 50);
  console.log(totalPages);
  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    // links.push(<NavLink to={`/api/employees/${i - 1}`}>{i}</NavLink>);
    links.push(i);
  }
  console.log(links);

  return (

    <nav>
      {links.map(link => (
        <Link to={`/${link - 1}`}>{link}</Link>
      ))}
    </nav>
  );
};
const Info = ({ employees, location }) => {
  console.log('lllll', employees.rows);
 
  const idPage = location.pathname.slice(1) * 1;

  fetchEmployess(idPage);

  return (
   
       {employees.rows.map(employee => 
       
          <table>
          <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.title}</td>
          </tr>
        
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Title</th>
      </tr>
  
      </table>
        
      )} 


  );
};
class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    console.log(store.getState());
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    // fetchEmployess();
  }
  render() {
    const { employees } = this.state;
    const totalPages = Math.ceil(employees.count / 50);
    let pagesArr = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArr.push(i);
    }
    return (
      // <div>
      //   hello
      //   <NavBar {...this.state} {...this.props} />
      //   <Info {...this.state} {...this.props} />
      // </div>
      <HashRouter>
        <Route render={props => <NavBar {...this.state} {...props} />} />
        <Route
          path="/:page?"
          render={props => <Info {...this.state} {...props} />}
        />
        {/* {pagesArr.map(page=><Route path='/api'/>)} */}
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, rootEl);
