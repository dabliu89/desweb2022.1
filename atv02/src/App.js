import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
// import "./App.css";

import Home from "./components/Home";
import About from "./components/About";

import CreateStudent from "./components/crud/students/CreateStudent";
import ListStudent from "./components/crud/students/ListStudent";
import EditStudent from "./components/crud/students/EditStudent";

import CreateProfessor from "./components/crud/professor/CreateProfessor";
import ListProfessor from "./components/crud/professor/ListProfessor";
import EditProfessor from "./components/crud/professor/EditProfessor";

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="navbar-brand" style={{ paddingLeft: 10 }}>CRUD</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <ul class="nav nav-tabs">              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Student</a>
                <ul class="dropdown-menu">
                  <li><Link to="/createStudent" className="nav-link " class="dropdown-item" href="#">Create Student </Link></li>
                  <li><Link to="/listStudent" className="nav-link" class="dropdown-item" href="#">List Student</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Professor</a>
                <ul class="dropdown-menu">
                <li><Link to="/createProfessor" className="nav-link " class="dropdown-item" href="#">Create Professor </Link></li>
                  <li><Link to="/listProfessor" className="nav-link" class="dropdown-item" href="#">List Professor</Link></li>
                </ul>
              </li>
            </ul>            
            <li className="navitem">
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="createStudent" element={<CreateStudent />} />
        <Route path="listStudent" element={<ListStudent />} />
        <Route path="createProfessor" element={<CreateProfessor />} />
        <Route path="listProfessor" element={<ListProfessor />} />
        <Route path="editStudent/:id" element={<EditStudent />} />
        <Route path="editProfessor/:id" element={<EditProfessor />} />
      </Routes>
    </div>

  );
}

export default App