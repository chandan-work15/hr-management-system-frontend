import React from "react";
import profileImg from "../../../../assets/images/pro-img.png";
import { formatWorkHours } from "../utils/timeUtils";

const AttendanceTable = ({
    records,
    onPreview,
    getStatusColor,
    onStatusChange,
    editedRecords,
}) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                <thead>
                    <tr className="table-warning">
                        <th>#</th>
                        <th>User Name</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Site</th>
                        <th>Entry Time</th>
                        <th>Exit Time</th>
                        <th>Work Hours</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {records.length > 0 ? (
                        records.map((record, index) => (
                            <tr key={record.id}>
                                <th>{index + 1}</th>

                                <td>
                                    <img
                                        src={record?.image || profileImg}
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
                                            onPreview(record?.image || profileImg)
                                        }
                                    />
                                    {record.userName}
                                </td>

                                <td>{record.department || "--"}</td>
                                <td>{record.role || "--"}</td>
                                <td>{record.site || "--"}</td>

                                <td>{record.entryTime || "--"}</td>
                                <td>{record.exitTime || "--"}</td>

                                <td>
                                    {record.entryTime && record.exitTime
                                        ? formatWorkHours(record.entryTime, record.exitTime)
                                        : "--"}
                                </td>

                                <td>
                                    <select
                                        className="form-select"
                                        value={editedRecords[record.id] || record.finalStatus}
                                        onChange={(e) =>
                                            onStatusChange(record.id, e.target.value)
                                        }
                                        style={{
                                            color: getStatusColor(
                                                editedRecords[record.id] || record.finalStatus
                                            ),
                                            fontWeight: "600",
                                        }}
                                    >
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                        <option value="late">Late</option>
                                        <option value="half_day">Half Day</option>
                                        <option value="leave">Leave</option>
                                        <option value="work_from_home">WFH</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">
                                No attendance records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;