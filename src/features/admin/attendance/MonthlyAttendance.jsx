import React, { useState, useEffect, useCallback } from "react";

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  // ✅ Static Raw Data (Same structure as API)
  const staticApiData = [
    {
      _id: `${currentYear}-${currentMonth}-01`,
      records: [
        { user_id: "1", user_name: "Chandan Kumar", status: "present" },
        { user_id: "2", user_name: "Rahul Sharma", status: "absent" },
        { user_id: "3", user_name: "Priya Singh", status: "work_from_home" },
      ],
    },
    {
      _id: `${currentYear}-${currentMonth}-02`,
      records: [
        { user_id: "1", user_name: "Chandan Kumar", status: "half_day" },
        { user_id: "2", user_name: "Rahul Sharma", status: "present" },
        { user_id: "3", user_name: "Priya Singh", status: "present" },
      ],
    },
    {
      _id: `${currentYear}-${currentMonth}-03`,
      records: [
        { user_id: "1", user_name: "Chandan Kumar", status: "present" },
        { user_id: "2", user_name: "Rahul Sharma", status: "work_from_home" },
        { user_id: "3", user_name: "Priya Singh", status: "absent" },
      ],
    },
  ];

  const preprocessAttendanceData = (data, daysInMonth) => {
    const userMap = {};

    data.forEach((dayRecord) => {
      dayRecord.records.forEach(({ user_id, user_name }) => {
        if (!userMap[user_id]) {
          userMap[user_id] = {
            name: user_name,
            attendance: Array(daysInMonth).fill(""),
          };
        }
      });
    });

    data.forEach((dayRecord) => {
      const recordDate = new Date(dayRecord._id);
      const month = recordDate.getMonth() + 1;
      const year = recordDate.getFullYear();
      const date = recordDate.getDate();

      if (month === currentMonth && year === currentYear) {
        dayRecord.records.forEach(({ user_id, status }) => {
          if (userMap[user_id]) {
            userMap[user_id].attendance[date - 1] = status;
          }
        });
      }
    });

    return Object.values(userMap);
  };

  // ✅ Replace API call
  const fetchAttendanceData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const processed = preprocessAttendanceData(staticApiData, daysInMonth);
      setAttendanceData(processed);
      setLoading(false);
    }, 500); // simulate API delay
  }, [currentMonth, currentYear, daysInMonth]); // eslint-disable-line

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  const handleMonthChange = (increment) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      let newYear = currentYear;

      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      } else if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  return (
    <div className="container-fluid attendance-page">

      <div className="px-lg-5 px-0">
        <div className="row">
          <div className="col-12 px-4">
            <h1 className="my-4">Attendance</h1>
          </div>

          <div className="col-md-12 mb-4">
            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
              <div className="card-header pt-3 d-block d-lg-flex justify-content-between bg-transparent border-bottom-0">
                <div>
                  <h4 className="mb-3 mb-lg-2 fw-bold">Monthly Attendance</h4>
                  <div className="d-block d-lg-flex">
                    <h6 className="me-3">✔️ Full Day Present</h6>
                    <h6 className="me-3">🔶 Work from Home</h6>
                    <h6 className="me-3">🔻 Half Day</h6>
                    <h6 className="me-3">❌ Full Day Absence</h6>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-warning rounded-pill" onClick={() => handleMonthChange(-1)}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>

                  <h4 className="mx-2 mb-0">
                    {new Date(currentYear, currentMonth - 1).toLocaleString("default", { month: "long" })} {currentYear}
                  </h4>

                  <button className="btn btn-warning rounded-pill" onClick={() => handleMonthChange(1)}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                      <thead>
                        <tr className="table-warning">
                          <th>#</th>
                          <th>Employee</th>
                          {Array.from({ length: daysInMonth }, (_, i) => (
                            <th key={i + 1}>{i + 1}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {attendanceData.map((employee, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{employee.name}</td>

                            {employee.attendance.map((status, i) => (
                              <td
                                key={i}
                                className={
                                  status === "present"
                                    ? "text-success"
                                    : status === "half_day"
                                    ? "text-warning"
                                    : status === "absent"
                                    ? "text-danger"
                                    : ""
                                }
                              >
                                {status === "present"
                                  ? "✔️"
                                  : status === "work_from_home"
                                  ? "🔶"
                                  : status === "half_day"
                                  ? "🔻"
                                  : status === "absent"
                                  ? "❌"
                                  : ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendance;