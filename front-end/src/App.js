import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import UpdateTask from './pages/UpdateTask';
import "./style.css";
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} > */}
          <Route path="/tasks" element={<Tasks />} />
          {/* </Route> */}
          <Route path="/add" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
