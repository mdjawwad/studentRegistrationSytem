import React, { useState, useEffect } from "react";
import "./dashboard.css";

import {
  getRecords,
  saveRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} from "../service/dashboardService";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");

  const [joinDate, setJoinDate] = useState("");

  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLang, setIsLang] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Course");
  const [selectLang, setSelectLang] = useState("Select language");

  const courses = ["Java", "Python", "React", "Angular"];
  const languages = ["Hindi", "English", "Telugu"];

  const courseToggle = () => setIsOpen(!isOpen);
  const LangToggle = () => setIsLang(!isLang);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleLang = (item) => {
    setSelectLang(item);
    setIsLang(false);
  };

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !age ||
      !email ||
      selectedItem === "Select Course" ||
      selectLang === "Select language" ||
      !joinDate
    ) {
      alert("Please fill all fields and select valid options.");
      return;
    }

    const newRecord = {
      name,
      age,
      email,
      language: selectLang,
      joinDate,
      courseName: selectedItem,
    };

    let updatedRecords;
    if (editIndex === -1) {
      updatedRecords = addRecord(records, newRecord);
    } else {
      updatedRecords = updateRecord(records, newRecord, editIndex);
      setEditIndex(-1);
    }

    setRecords(updatedRecords);
    saveRecords(updatedRecords);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setEmail("");
    setJoinDate("");
    setSelectedItem("Select Course");
    setSelectLang("Select language");
    setEditIndex(-1);
  };

  const editRecord = (index) => {
    const record = records[index];
    setName(record.name);
    setAge(record.age);
    setEmail(record.email);
    setJoinDate(record.joinDate);
    setSelectedItem(record.courseName);
    setSelectLang(record.language);
    setEditIndex(index);
  };

  const confirmDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedRecords = deleteRecord(records, index);
      setRecords(updatedRecords);
      saveRecords(updatedRecords);
    }
  };

  return (
    <div className="container">
      <div className="top">
        <h1>Student Registration</h1>
        <form id="record-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student Name"
            required
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <div className="dropdown" style={{ position: "relative" }}>
            <button
              type="button"
              onClick={courseToggle}
              className="dropdown-btn"
            >
              {selectedItem} &#11145;
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                {courses.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="dropdown-item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dropdown" style={{ position: "relative" }}>
            <button type="button" onClick={LangToggle} className="dropdown-btn">
              {selectLang} &#11145;
            </button>
            {isLang && (
              <div className="dropdown-menu">
                {languages.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleLang(item)}
                    className="dropdown-item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="date"
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
            placeholder="Join Date"
            required
          />

          <button type="submit">
            {editIndex === -1 ? "Add Record" : "Update Record"}
          </button>
        </form>
      </div>

      <div className="bottom">
        <h2>Records</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Course</th>
              <th>Join Date</th>
              <th>Language</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "red" }}>
                  No Record Found
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.age}</td>
                  <td>{record.email}</td>
                  <td>{record.courseName}</td>
                  <td>{record.joinDate}</td>
                  <td>{record.language}</td>
                  <td>
                    <button onClick={() => editRecord(index)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => confirmDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
