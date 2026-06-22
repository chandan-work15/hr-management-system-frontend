import React, { useState, useEffect } from "react";
import profileImg from '../../../assets/images/pro-img.png'
// import { autoMarkLeaves } from "../api/attendanceApi";

const LeaveRequest = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handlePreview = (imgUrl) => {
        setPreviewImage(imgUrl);
    };

    // ✅ Static Leave Data
    const staticEmployees = [
        {
            _id: "1",
            user_id: { name: "Chandan Kumar", username: "chandan@gmail.com" },
            image: "",
            leave_type: "Sick Leave",
            from_date: "2026-04-10",
            to_date: "2026-04-12",
            reason: "Fever and cold",
            status: "pending",
        },
        {
            _id: "2",
            user_id: { name: "Rahul Sharma", username: "rahul@gmail.com" },
            image: "",
            leave_type: "Casual Leave",
            from_date: "2026-04-08",
            to_date: "2026-04-09",
            reason: "Personal work",
            status: "approved",
        },
        {
            _id: "3",
            user_id: { name: "Priya Singh", username: "priya@gmail.com" },
            image: "",
            leave_type: "Work From Home",
            from_date: "2026-04-11",
            to_date: "2026-04-11",
            reason: "Not feeling well",
            status: "rejected",
        },
    ];

    // ✅ Replace API call
    const getEmployees = () => {
        setLoading(true);

        setTimeout(() => {
            setEmployees(staticEmployees);
            setLoading(false);
        }, 500); // simulate API delay
    };

    useEffect(() => {
        getEmployees();
    }, []);

    // ✅ Update status and auto-mark leaves if approved
    const updateStatus = async (id, newStatus) => {
        try {
            // Update local state
            const updated = employees.map((emp) =>
                emp._id === id ? { ...emp, status: newStatus } : emp
            );
            setEmployees(updated);

            // 🔥 If approval, auto-mark attendance as leave
            if (newStatus === "approved") {
                const leave = employees.find(emp => emp._id === id);
                if (leave) {
                    setSubmitting(true);
                    try {
                        // const response = await autoMarkLeaves(id);
                        console.log('Leave auto-marked:', response.data);
                        
                        // Show success toast
                        alert(`✅ Status updated to APPROVED\n📅 Attendance auto-marked for ${response.data.data.length} days`);
                    } catch (error) {
                        console.error('Error auto-marking leaves:', error);
                        // Show warning but don't fail the approval
                        alert(`✅ Status updated to APPROVED\n⚠️ Auto-marking failed - may need manual marking`);
                    } finally {
                        setSubmitting(false);
                    }
                }
            } else {
                alert(`✅ Status updated to ${newStatus.toUpperCase()}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('❌ Error updating status');
        }
    };

    return (
        <>
            <div className="container-fluid attendance-page">

                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Leave Request</h1>
                        </div>

                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold">Attendance List</h4>
                                </div>

                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-dark"></div>
                                            <p>Loading data...</p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                                <thead>
                                                    <tr className="table-warning">
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>User Name</th>
                                                        <th>Leave Type</th>
                                                        <th>From</th>
                                                        <th>To</th>
                                                        <th>Reason</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {employees.length > 0 ? (
                                                        [...employees]
                                                            .sort((a, b) => {
                                                                if (a.status === "pending" && b.status !== "pending") return -1;
                                                                if (a.status !== "pending" && b.status === "pending") return 1;
                                                                return 0;
                                                            })
                                                            .map((employee, index) => (
                                                                <tr key={employee._id}>
                                                                    <th>{index + 1}</th>

                                                                    <td>
                                                                        <img
                                                                            src={employee.image || profileImg}
                                                                            alt=""
                                                                            className="tbl-empImg shadow"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                                width: "40px",
                                                                                height: "40px",
                                                                                objectFit: "cover",
                                                                                borderRadius: "50%",
                                                                            }}
                                                                            onClick={() =>
                                                                                handlePreview(employee.image || profileImg)
                                                                            }
                                                                        />
                                                                        {employee.user_id.name}
                                                                    </td>

                                                                    <td>{employee.user_id.username}</td>
                                                                    <td>{employee.leave_type}</td>
                                                                    <td>{employee.from_date}</td>
                                                                    <td>{employee.to_date}</td>
                                                                    <td>{employee.reason}</td>

                                                                    <td
                                                                        className={
                                                                            employee.status === "pending"
                                                                                ? "text-warning"
                                                                                : employee.status === "rejected"
                                                                                ? "text-danger"
                                                                                : "text-success"
                                                                        }
                                                                    >
                                                                        {employee.status || "approved"}
                                                                    </td>

                                                                    <td>
                                                                        <button
                                                                            className="btn btn-success rounded-5 me-3"
                                                                            onClick={() =>
                                                                                updateStatus(employee._id, "approved")
                                                                            }
                                                                            disabled={submitting || employee.status === "approved"}
                                                                        >
                                                                            {submitting && employee.status === "pending" ? (
                                                                                <>
                                                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                                                    Processing...
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    Approve <i className="fa-solid fa-thumbs-up ms-2"></i>
                                                                                </>
                                                                            )}
                                                                        </button>

                                                                        <button
                                                                            className="btn btn-danger rounded-5 me-3"
                                                                            onClick={() =>
                                                                                updateStatus(employee._id, "rejected")
                                                                            }
                                                                            disabled={submitting || employee.status === "rejected"}
                                                                        >
                                                                            Reject <i className="fa-solid fa-thumbs-down ms-2"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="text-center">
                                                                No Leave Requests Found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Preview Modal */}
                {previewImage && (
                    <div
                        className="modal fade show"
                        style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
                        onClick={() => setPreviewImage(null)}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-content" style={{ background: "rgba(0,0,0,0.8)" }}>
                                <div className="modal-header border-0">
                                    <h5 className="modal-title text-white">Image Preview</h5>
                                    <button
                                        className="btn-close bg-white rounded-circle"
                                        onClick={() => setPreviewImage(null)}
                                    ></button>
                                </div>

                                <div className="modal-body text-center">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="img-fluid rounded shadow"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeaveRequest;