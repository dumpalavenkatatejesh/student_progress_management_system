import React from "react";

class DarkModeToggle extends React.Component {
  render() {
    const { darkMode, toggle } = this.props;
    return (
      <button className="toggle-btn" onClick={toggle}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    );
  }
}

export default DarkModeToggle;
