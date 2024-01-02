import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./Add-Update.css";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-secondary text-dark fixed-top">
      <div class="container-fluid navbar-nav ">
        {/* <a class="navbar-brand" href="/">Your Tasks</a> */}
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item ">
              <a class="nav-link active" aria-current="page" href="/tasks">
                <HomeOutlined style={{ fontSize: "26px", color: "white" }} />
              </a>
            </li>
          </ul>
          <li class="nav-item ">
            <a
              class="nav-link active btn btn-outline-success"
              aria-current="page"
              href="/add"
            >
              <PlusCircleOutlined
                style={{ fontSize: "26px", color: "white" }}
              />
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
