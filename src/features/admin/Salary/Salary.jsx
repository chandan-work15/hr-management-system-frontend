import React, { useState, useEffect, useRef } from "react";
import Payslip from "./components/Payslip";
// import html2pdf from "html2pdf.js";
import profileImg from '../../../assets/images/pro-img.png'

const Salary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPayslip, setShowPayslip] = useState(false);
  const payslipRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreview = (imgUrl) => {
    setPreviewImage(imgUrl);
  };

  // ✅ Static Data
  const staticEmployees = [
    {
      user_id: "1",
      name: "Rahul Sharma",
      role: "Developer",
      total_present_days: 22,
      wages_per_day: 500,
      start_date: "2026-04-01",
      end_date: "2026-04-30",
      image: "",
    },
    {
      user_id: "2",
      name: "Amit Verma",
      role: "Designer",
      total_present_days: 20,
      wages_per_day: 600,
      start_date: "2026-04-01",
      end_date: "2026-04-30",
      image: "",
    },
    {
      user_id: "3",
      name: "Priya Singh",
      role: "HR",
      total_present_days: 24,
      wages_per_day: 450,
      start_date: "2026-04-01",
      end_date: "2026-04-30",
      image: "",
    },
  ];

  // ✅ Load static data
  const loadData = () => {
    const updatedData = staticEmployees.map((employee) => ({
      ...employee,
      total_salary:
        (employee.total_present_days ?? 0) *
        (employee.wages_per_day ?? 0),
    }));

    setAttendanceData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadData(); // filter not needed for static
  };

  const handlePrint = (employee) => {
    setSelectedEmployee(employee);
    setShowPayslip(true);
  };

  useEffect(() => {
    const currentDate = new Date();

    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];

    const today = currentDate.toISOString().split("T")[0];

    setStartDate(firstDay);
    setEndDate(today);

    loadData();
  }, []);

  // ✅ Auto print
  useEffect(() => {
    if (showPayslip) {
      setTimeout(() => {
        window.print();
        setShowPayslip(false);
        setSelectedEmployee(null);
      }, 300);
    }
  }, [showPayslip]);

  const handleUpload = async (employee) => {
    setSelectedEmployee(employee);
    setShowPayslip(true);

    setTimeout(async () => {
      const element = payslipRef.current;
      if (!element) return;

      const opt = {
        margin: 0,
        filename: `${employee.name}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      try {
        // ✅ Download PDF instead of upload
        await html2pdf().from(element).set(opt).save();

        alert("Payslip downloaded successfully ✅");
      } catch (error) {
        console.error(error);
        alert("Error generating payslip ❌");
      } finally {
        setShowPayslip(false);
        setSelectedEmployee(null);
      }
    }, 300);
  };

  return (
    <div className="container-fluid">

      <div className="px-lg-5 px-0">

        {/* ✅ Hidden Payslip for PDF */}
        {showPayslip && selectedEmployee && (
          <div style={{ position: "absolute", left: "-9999px" }}>
            <div ref={payslipRef}>
              <Payslip
                employee={selectedEmployee}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>
        )}

        <div className="d-print-none">
          <div className="row">
            <div className="col-12 px-4">
              <h1 className="my-4">Salary</h1>
            </div>

            <div className="col-md-12 mb-4">
              <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                <div className="card-header pt-3 d-flex justify-content-between align-items-center bg-transparent">
                  <h4 className="fw-bold">Salary List</h4>

                  <form className="row g-2" onSubmit={handleSubmit}>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-control"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-control"
                    />
                    <button className="btn btn-dark rounded-pill">
                      Filter
                    </button>
                  </form>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr className="table-warning">
                          <th>#</th>
                          <th>Name</th>
                          <th>Job Title</th>
                          <th>Present Days</th>
                          <th>Wages</th>
                          <th>Total Salary</th>
                          <th>Start</th>
                          <th>End</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {attendanceData.map((emp, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>
                              <img
                                src={emp.image || profileImg}
                                alt=""
                                className="tbl-empImg"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  cursor: "pointer"
                                }}
                                onClick={() =>
                                  handlePreview(emp.image || profileImg)
                                }
                              />
                              {emp.name}
                            </td>

                            <td>{emp.role}</td>
                            <td>{emp.total_present_days}</td>
                            <td>{emp.wages_per_day}/-</td>
                            <td>{emp.total_salary}/-</td>
                            <td>{emp.start_date}</td>
                            <td>{emp.end_date}</td>

                            <td>
                              <button
                                className="btn btn-secondary me-2 rounded-5"
                                onClick={() => handlePrint(emp)}
                              >
                                Print
                              </button>

                              <button
                                className="btn btn-primary rounded-5"
                                onClick={() => handleUpload(emp)}
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {attendanceData.length === 0 && (
                      <p className="text-center mt-3">No Data</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Image Preview Modal */}
      {previewImage && (
        <div
          className="modal show"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark">
              <div className="modal-header border-0">
                <h5 className="text-white">Preview</h5>
                <button
                  className="btn-close bg-white"
                  onClick={() => setPreviewImage(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={previewImage}
                  alt="preview"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Salary;