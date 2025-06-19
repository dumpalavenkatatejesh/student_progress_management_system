import React from "react";

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    // Get student id from URL params using window.location (since no hooks)
    // Assuming URL like /profile/12345
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    fetch(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student data");
        return res.json();
      })
      .then((student) => this.setState({ student, loading: false }))
      .catch((error) => this.setState({ error: error.message, loading: false }));
  }

  render() {
    const { student, loading, error } = this.state;

    if (loading) return <div>Loading student profile...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!student) return <div>Select a student to view profile</div>;

    return (
      <div>
        <h2>{student.name}'s Profile</h2>
        <p>Email: {student.email}</p>
        <p>Phone: {student.phone}</p>
        <p>Codeforces Handle: {student.codeforcesHandle}</p>
        <p>Current Rating: {student.currentRating}</p>
        <p>Max Rating: {student.maxRating}</p>
      </div>
    );
  }
}

export default StudentProfile;
