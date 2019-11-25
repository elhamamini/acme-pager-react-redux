import React from 'react';
import axios from 'axios';
import { createStore, combineReducers } from 'redux';
const SET_EMPLOYEES = 'SET_EMPLOYESS';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

const reducer = combineReducers({
  employees: (state = [], action) => {
    if (action.type === SET_EMPLOYEES) {
      state = action.employees;
    } else if (action.type === DELETE_EMPLOYEE) {
      state = state.filter(employee => employee.id !== action.employee.id);
    }

    return state;
  }
});
const store = createStore(reducer);

const creatEmployees = employees => {
  return {
    type: SET_EMPLOYEES,
    employees
  };
};
const fetchEmployees = id => {
  axios
    .get(`/api/employees/${id}`)
    // .get('/api/employees')
    .then(response => store.dispatch(creatEmployees(response.data)))
    .catch(e => console.log(e));
};
export { reducer, store, fetchEmployees };
