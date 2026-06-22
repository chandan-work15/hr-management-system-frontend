import React, { useState, useEffect } from "react";
import { useGetAttendanceByDateQuery, useBulkUpdateAttendanceMutation } from "../api/attendanceApi";
import { formatWorkHours } from "./utils/timeUtils";
import { calculateSummary } from "./utils/summaryUtils";
import { Link } from "react-router-dom";
import AttendanceTable from "./components/AttendanceTable";
import AttendanceSummary from "./components/AttendanceSummary";
import AttendanceFilters from "./components/AttendanceFilters";

const Attendance = () => {
    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [previewImage, setPreviewImage] = useState(null);
    const [editedRecords, setEditedRecords] = useState({});

    const {
        data,
        isLoading,
        isError,
    } = useGetAttendanceByDateQuery(currentDate);

    const [bulkUpdate] = useBulkUpdateAttendanceMutation();

    // Helper
    const formatTime = (date) => {
        if (!date) return null;
        return new Date(date).toTimeString().slice(0, 5); // HH:mm
    };

    // MAP API DATA
    const attendanceRecords =
        data?.data?.[0]?.records.map((item) => ({
            id: item._id,
            userName: item.name,
            date: data?.data?.[0]?._id,
            entryTime: formatTime(item.entry),
            exitTime: formatTime(item.exit),
            department: item.department,
            role: item.job_title,
            site: item.site,
            status: item.status,
        })) || [];

    const [filter, setFilter] = useState({
        department: "all",
        role: "all",
        site: "all",
    });

    // 🎨 Status Color
    const getStatusColor = (status) => {
        switch (status) {
            case "present":
                return "#28a745";
            case "absent":
                return "#dc3545";
            case "late":
                return "#fd7e14";
            case "half_day":
                return "#ffc107";
            case "leave":
                return "#6f42c1";
            case "holiday":
                return "#20c997";
            case "weekend":
                return "#6c757d";
            case "work_from_home":
                return "#17a2b8";
            default:
                return "#000";
        }
    };

    const handlePreview = (imgUrl) => setPreviewImage(imgUrl);

    const handleStatusChange = (id, newStatus) => {
        setEditedRecords((prev) => ({
            ...prev,
            [id]: newStatus,
        }));
    };

    // 🔍 FILTER
    const filteredRecords = attendanceRecords.filter((record) => {
        return (
            (filter.department === "all" ||
                record.department === filter.department) &&
            (filter.role === "all" || record.role === filter.role) &&
            (filter.site === "all" || record.site === filter.site)
        );
    });

    const finalRecords = attendanceRecords.map((record) => ({
        ...record,
        finalStatus: editedRecords[record.id] || record.status,
    }));

    // 📊 SUMMARY
    const summary = calculateSummary(finalRecords);

    // 🚀 BULK UPDATE (REAL API)
    const handleBulkUpdate = async () => {
        try {
            const payload = Object.entries(editedRecords).map(
                ([id, status]) => ({
                    _id: id,
                    status,
                })
            );

            if (payload.length === 0) {
                alert("No changes to update");
                return;
            }

            await bulkUpdate({ attendanceUpdates: payload }).unwrap();

            alert("Updated successfully");

            setEditedRecords({});
        } catch (err) {
            console.error(err);
            alert("Bulk update failed");
        }
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
                            {/* HEADER */}
                            <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                <h4 className="mb-0 fw-bold">Today Attendance</h4>
                                <div className="d-flex gap-3">
                                    <Link to="/admin/monthly-attendance" className="btn btn-dark rounded-5">
                                        Monthly Attendance
                                    </Link>
                                    <input
                                        type="date"
                                        value={currentDate}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="card-body">
                                {isLoading ? (
                                    <div className="text-center">
                                        <div className="spinner-border"></div>
                                    </div>
                                ) : isError ? (
                                    <div className="text-danger text-center">
                                        Failed to load attendance
                                    </div>
                                ) : (
                                    <>
                                        {/* 📊 SUMMARY */}
                                        <AttendanceSummary summary={summary} />

                                        {/* Filter */}
                                        <AttendanceFilters filter={filter} setFilter={setFilter} />

                                        {/* 📋 TABLE */}
                                        <AttendanceTable
                                            records={finalRecords}
                                            onPreview={handlePreview}
                                            getStatusColor={getStatusColor}
                                            onStatusChange={handleStatusChange}
                                            editedRecords={editedRecords}
                                        />
                                    </>
                                )}

                                {/* 🔥 BULK BUTTON */}
                                <div className="text-end mt-4">
                                    <button
                                        className="btn btn-success rounded-5"
                                        onClick={handleBulkUpdate}
                                    >
                                        Update Attendance (Bulk)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMAGE PREVIEW */}
            {previewImage && (
                <div
                    className="modal show"
                    style={{ display: "block", background: "#0008" }}
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-body text-center">
                                <img
                                    src={previewImage}
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;