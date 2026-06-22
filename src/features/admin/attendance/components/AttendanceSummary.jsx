import React from "react";

const AttendanceSummary = ({ summary }) => {
    return (
        <div className="row mb-3">
            <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-muted">Employees</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-muted text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.total}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-success">Present</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-success text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.present}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-danger">Absent</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-danger text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.absent}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-warning">Late</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-warning text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.late}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-info">Half Day</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-info text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.half_day}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-primary">Leave</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-primary text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.leave}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col">
                <div className="card border-0 rounded-4">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className=" mb-0 fw-bold small-14 text-dark">Average</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h2 className="mb-0 text-dark text-end"
                                    style={{ fontWeight: 'bold' }}>{summary.attendancePercentage}%</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default AttendanceSummary;