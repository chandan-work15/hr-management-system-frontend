import React, { useEffect, useState } from "react";

const EditAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const [formData, setFormData] = useState({
    user_entry_time: "",
    user_exit_time: "",
    status: "Present",
  });

  // ✅ Static Users
  const staticUsers = [
    { _id: "1", name: "Chandan Kumar", username: "chandan@gmail.com" },
    { _id: "2", name: "Rahul Sharma", username: "rahul@gmail.com" },
    { _id: "3", name: "Priya Singh", username: "priya@gmail.com" },
  ];

  // ✅ Static Attendance Records
  const staticAttendance = [
    {
      user_id: { _id: "1", name: "Chandan Kumar" },
      date: selectedDate,
      user_entry_time: "10:00",
      user_exit_time: "19:00",
      status: "present",
    },
    {
      user_id: { _id: "2", name: "Rahul Sharma" },
      date: selectedDate,
      user_entry_time: "10:30",
      user_exit_time: "18:30",
      status: "half_day",
    },
  ];

  // ✅ Replace API - Load Users
  const fetchAllUsers = () => {
    setAllUsers(staticUsers);
  };

  // ✅ Replace API - Load Attendance
  const fetchAttendanceUsers = () => {
    setAttendanceRecords(staticAttendance);
  };

  const fetchUserAttendance = () => {
    const userAttendance = attendanceRecords.find(
      (a) => a.user_id?._id === selectedUser
    );

    if (userAttendance) {
      setFormData({
        user_entry_time: userAttendance.user_entry_time || "",
        user_exit_time: userAttendance.user_exit_time || "",
        status: userAttendance.status || "present",
      });
    } else {
      setFormData({
        user_entry_time: "",
        user_exit_time: "",
        status: "present",
      });
    }
  };

  // ✅ Dummy Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      user_id: selectedUser,
      date: selectedDate,
      user_entry_time: formData.user_entry_time,
      user_exit_time: formData.user_exit_time,
      status: formData.status,
    };

    console.log("Saved Attendance:", payload);
    alert("Attendance updated successfully (Static Mode)");
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchAttendanceUsers();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedUser) {
      fetchUserAttendance();
    }
  }, [selectedUser, attendanceRecords]);

  return (
    <div className="container-fluid">
      <div className="container my-4">
        <h2>Edit Attendance</h2>

        <form onSubmit={handleSubmit} className="card p-4 rounded-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Select User</label>
            <select
              className="form-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">-- Select Employee --</option>

              {allUsers?.length > 0 ? (
                allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name || user.username || "No Name"}
                  </option>
                ))
              ) : (
                <option disabled>No users found</option>
              )}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Entry Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.user_entry_time}
              onChange={(e) =>
                setFormData({ ...formData, user_entry_time: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Exit Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.user_exit_time}
              onChange={(e) =>
                setFormData({ ...formData, user_exit_time: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="work_from_home">Work From Home</option>
              <option value="half_day">Half Day</option>
            </select>
          </div>

          <button className="btn btnColor" type="submit">
            Save Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAttendance;