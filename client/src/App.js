import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentTable from "./components/StudentTable";
import StudentProfile from "./components/StudentProfile";
import DarkModeToggle from "./components/DarkModeToggle";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { darkMode: false };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode() {
    this.setState((prev) => ({ darkMode: !prev.darkMode }));
  }

  render() {
    const themeClass = this.state.darkMode ? "dark-mode" : "light-mode";

    return (
      <div className={themeClass}>
        <Router>
          <header>
            <h1>Student Progress Management System</h1>
            <DarkModeToggle
              darkMode={this.state.darkMode}
              toggle={this.toggleDarkMode}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<StudentTable />} />
              <Route path="/profile/:id" element={<StudentProfile />} />
            </Routes>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
