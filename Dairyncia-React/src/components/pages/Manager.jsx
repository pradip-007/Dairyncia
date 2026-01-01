import React, { useState } from "react";
import ManagerDashboard from "../Manager/ManagerDashboard";
import FarmerList from "../admin/FarmerList";
import MilkCollectionList from "../admin/MilkCollectionList";
import "./Manager.css";

const Manager = () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
      <div className="manager-page" >
        <ul className=" mt-5 nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Manager Dashboard
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "farmers" ? "active" : ""}`}
              onClick={() => setActiveTab("farmers")}
            >
              Farmers
            </button>
          </li>

          {/*  NEW TAB */}
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "milk" ? "active" : ""}`}
              onClick={() => setActiveTab("milk")}
            >
              Milk Collections
            </button>
          </li>
        </ul>

        <div className="tab-content mt-4">
          {activeTab == "home" && <ManagerDashboard />}
          {activeTab == "farmers" && <FarmerList />}
          {activeTab == "milk" && <MilkCollectionList />}
        </div>
        
      </div>
  );
}

export default Manager;
