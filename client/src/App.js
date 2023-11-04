import React, { useEffect, useState } from "react";
import "./App.css";
import Piechart from "./components/chart.js";

import axios from "axios";

const App = () => {
  const [jwtToken, setJwtToken] = useState(null);

  const mainUrl = "https://pvldemo-production.up.railway.app/";
  //get token and save it for other calls
  axios
    .get(mainUrl + "get-token")
    .then((response) => {
      const token = response.data.token;
      setJwtToken(token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // 'People' or 'Settings'
  const [tab, setTab] = useState("People");

  // Default data
  var peopleData = {
    Male: 0,
    Female: 0,
    Boy: 0,
    Girl: 0,
  };

  // Function to switch between tabs
  const switchTab = (newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <div className="navbar">
        <h1>PVL Assessment Demo App</h1>
        <div className="tab-bar">
          <button className="button" onClick={() => switchTab("People")}>
            People
          </button>
          <button className="button" onClick={() => switchTab("Settings")}>
            Settings
          </button>
        </div>
      </div>
      <div className="app-container">
        <div className="app-content">
          {tab === "People" ? (
            <PeopleTab peopleData={peopleData} jwtToken={jwtToken} />
          ) : (
            <SettingsTab jwtToken={jwtToken} />
          )}
        </div>
      </div>
    </div>
  );
};

//People Tab
const PeopleTab = ({ peopleData, jwtToken }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get("https://pvldemo-production.up.railway.app/people", {
        headers: {
          authorization: jwtToken,
        },
      })
      .then((response) => {
        setPeople(response.data);

        for (const category in response.data[0]) {
          if (peopleData.hasOwnProperty(category)) {
            peopleData[category] = response.data[0][category];
          }
        }
        setPeople(peopleData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [peopleData]);

  return (
    <div>
      <div>
        <h2>People Tab</h2>
        {Object.keys(peopleData).map((category) => (
          <div key={category} className="category">
            <span className="category-name">{category}</span>
            <span className="category-count">{peopleData[category]}</span>
          </div>
        ))}
      </div>
      <div className="chart">
        <Piechart data={people} />
      </div>
    </div>
  );
};

// Settings Tab
const SettingsTab = ({ jwtToken }) => {
  const [formData, setFormData] = useState({
    Male: 0,
    Female: 0,
    Boy: 0,
    Girl: 0,
  });
  // console.log(jwtToken);
  useEffect(() => {
    axios
      .get("https://pvldemo-production.up.railway.app/people", {
        headers: {
          authorization: jwtToken,
        },
      })
      .then((response) => {
        delete response.data[0]._id;
        setFormData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  // Function to update the database with the form data
  const updateDatabase = () => {
    // console.log(jwtToken);
    axios
      .post(
        "https://pvldemo-production.up.railway.app/users/update",
        formData,
        {
          headers: {
            authorization: jwtToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error updating database:", error);
        alert("Error updating database. Please try again.");
      });
    // alert("Database updated successfully");
  };

  return (
    <div>
      <h2>Settings Tab</h2>

      <div className="settings-form">
        {Object.keys(formData).map((category) => (
          <div key={category} className="category">
            <div key={category} className="form-field">
              <label htmlFor={category}>{category}:</label>
              <input
                type="number"
                id={category}
                name={category}
                value={formData[category]}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}
        <button className="button" onClick={updateDatabase}>
          Update Database
        </button>
      </div>
    </div>
  );
};

export default App;
