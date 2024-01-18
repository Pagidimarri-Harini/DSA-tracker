
import React, { useState, useEffect, createContext } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicCard from "./components/TopicCard/TopicCard";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Topic from "./components/Topic/Topic";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";

// Creating a theme context
export const ThemeContext = createContext(null);

function App() {
  // Setting state for data received from the DB
  const [questionData, setQuestionData] = useState([]);
  // If dark theme is enabled or not
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const { topicName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getData");

        setQuestionData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      if (!("isDark" in window.localStorage)) {
        window.localStorage.setItem("isDark", dark);
      } else {
        let temp = window.localStorage["isDark"];
        setDark(temp === "true");
      }
    };

    fetchData();
  }, [dark, questionData]);

  // To update progress in '/' route and also update DB
  async function updateData(key, topicData, topicPosition,rowId) {
    try {
      await axios.put(`http://localhost:3001/updateData/${key}`, { topicData, topicPosition,rowId });
  
      setQuestionData((prevData) =>
        prevData.map((topic, index) =>
          index === topicPosition ? { ...topic, ...topicData } : topic
        )
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
  
  

  // Reset and clear DB
  async function resetData() {
    try {
      await axios.delete("http://localhost:3001/resetData");
      setQuestionData([]);
      navigate(window.location.origin);
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  }

  // Export 450DSA-Progress data
  async function exportData() {
    try {
      const response = await axios.post("http://localhost:3001/exportData");
      const exportedData = response.data;
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  }

  // Import 450DSA-Progress data
  async function importData(data, callback) {
    try {
      await axios.post("http://localhost:3001/importData", data);
      const response = await axios.get("http://localhost:3001/getData");
      setQuestionData(response.data.data);
    } catch (error) {
      console.error("Error importing data:", error);
    }
  }

  return (
    <div className={dark ? "App dark" : "App"}>
      <h1 className="app-heading" style={{ color: dark ? "white" : "" }}>

      </h1>

      {questionData.length === 0 ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <>
          <ThemeContext.Provider value={dark}>
            <Routes>
              <Route
                exact
                path="/"
                element={<TopicCard questionData={questionData} />}
              />
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/about"
                element={
                  <About
                    resetData={resetData}
                    exportData={exportData}
                    importData={importData}
                    setQuestionData={setQuestionData}
                  />
                }
              />

              {/* Add your other routes here */}
              {questionData.map((topic, index) => (
                <Route
                  key={index}
                  path={`/${topic.topicName.toLowerCase()}`}
                  element={<Topic data={topic} updateData={updateData} />}
                />
              ))}
              <Route path="/array" element={<Topic data={questionData[0]} updateData={updateData} />} />
						<Route path="/matrix" element={<Topic data={questionData[1]} updateData={updateData} />} />
						<Route path="/string" element={<Topic data={questionData[2]} updateData={updateData} />} />
						<Route path="/search_sort" element={<Topic data={questionData[3]} updateData={updateData} />} />
						<Route path="/linked_list" element={<Topic data={questionData[4]} updateData={updateData} />} />
						<Route path="/binary_trees" element={<Topic data={questionData[5]} updateData={updateData} />} />
						<Route path="/bst" element={<Topic data={questionData[6]} updateData={updateData} />} />
						<Route path="/greedy" element={<Topic data={questionData[7]} updateData={updateData} />} />
						<Route path="/backtracking" element={<Topic data={questionData[8]} updateData={updateData} />} />
						<Route path="/stacks_queues" element={<Topic data={questionData[9]} updateData={updateData} />} />
						<Route path="/heap" element={<Topic data={questionData[10]} updateData={updateData} />} />
						<Route path="/graph" element={<Topic data={questionData[11]} updateData={updateData} />} />
						<Route path="/trie" element={<Topic data={questionData[12]} updateData={updateData} />} />
						<Route path="/dynamic_programming" element={<Topic data={questionData[13]} updateData={updateData} />} />



						<Route path="/bit_manipulation" element={<Topic data={questionData[14]} updateData={updateData} />} />

              <Route path="/home" element={<App />} />
            </Routes>
          </ThemeContext.Provider>
        </>
      )}

      {/* Add your footer or other components here */}
    </div>
  );
}

export default App;