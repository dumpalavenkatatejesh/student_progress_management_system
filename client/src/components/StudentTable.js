import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      loading: true,
      error: null,
    };
    this.fetchStudents = this.fetchStudents.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents() {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => this.setState({ students: res.data, loading: false }))
      .catch((err) => this.setState({ error: err.message, loading: false }));
  }

  handleDelete(id) {
    if (window.confirm("Delete this student?")) {
      axios
        .delete(`http://localhost:5000/api/students/${id}`)
        .then(() => this.fetchStudents())
        .catch((err) => alert("Error deleting student: " + err.message));
    }
  }

  downloadCSV() {
    const { students } = this.state;
    if (students.length === 0) {
      alert("No data to export");
      return;
    }

    const header = [
      "Name",
      "Email",
      "Phone",
      "Codeforces Handle",
      "Current Rating",
      "Max Rating",
    ];
    const rows = students.map((s) => [
      s.name,
      s.email,
      s.phone,
      s.codeforcesHandle,
      s.currentRating,
      s.maxRating,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    const { students, loading, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <button onClick={this.downloadCSV}>Download CSV</button>
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Codeforces Handle</th>
              <th>Current Rating</th>
              <th>Max Rating</th>
              <th>Last Synced</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.codeforcesHandle}</td>
                <td>{s.currentRating}</td>
                <td>{s.maxRating}</td>
                <td>
                  {s.lastSynced
                    ? new Date(s.lastSynced).toLocaleString()
                    : "Never"}
                </td>
                <td>
                  <Link to={`/profile/${s._id}`}>View</Link>{" "}
                  <button onClick={() => this.handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentTable;
``
