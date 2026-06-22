import React from "react";

const AttendanceFilters = ({ filter, setFilter }) => {
    return (
        <div className="row mb-3">
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control rounded-5"
                    placeholder="Search employee..."

                />
            </div>
            <div className="col-md-3">
                <select
                    className="form-select rounded-5"
                    value={filter.department}
                    onChange={(e) =>
                        setFilter({ ...filter, department: e.target.value })
                    }
                >
                    <option value="all">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                </select>
            </div>

            <div className="col-md-3">
                <select
                    className="form-select rounded-5"
                    value={filter.role}
                    onChange={(e) =>
                        setFilter({ ...filter, role: e.target.value })
                    }
                >
                    <option value="all">All Roles</option>
                    <option value="Developer">Developer</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Sales Executive">Sales Executive</option>
                </select>
            </div>

            <div className="col-md-3">
                <select
                    className="form-select rounded-5"
                    value={filter.site}
                    onChange={(e) =>
                        setFilter({ ...filter, site: e.target.value })
                    }
                >
                    <option value="all">All Sites</option>
                    <option value="Head Office">Head Office</option>
                    <option value="Branch Office">Branch Office</option>
                </select>
            </div>
        </div>
    );
};

export default AttendanceFilters;