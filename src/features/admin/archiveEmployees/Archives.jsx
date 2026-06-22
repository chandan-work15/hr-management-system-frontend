import React, { useState, useEffect } from 'react';
import ProfileImg from '../../../assets/images/pro-img.png'

const Archives = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Static Archived Employees
    const staticEmployees = [
        {
            _id: "1",
            name: "Rahul Sharma",
            username: "rahul@gmail.com",
            role: "Developer",
            wages_per_day: 500,
        },
        {
            _id: "2",
            name: "Amit Verma",
            username: "amit@gmail.com",
            role: "Designer",
            wages_per_day: 600,
        },
        {
            _id: "3",
            name: "Priya Singh",
            username: "priya@gmail.com",
            role: "HR",
            wages_per_day: 450,
        },
    ];

    // ✅ Load Static Data
    const loadEmployees = () => {
        setLoading(true);
        setTimeout(() => {
            setEmployees(staticEmployees);
            setLoading(false);
        }, 500); // small delay for loader feel
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    // ✅ Undo (Remove from list locally)
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to undo this employee?")) return;

        const updatedList = employees.filter(emp => emp._id !== id);
        setEmployees(updatedList);

        toast.success("Employee restored successfully!");
    };

    return (
        <div className="container-fluid">

            <div className="px-lg-5 px-0">
                <div className="row">
                    <div className="col-12 px-4">
                        <h1 className="my-4">Previous Employees List</h1>
                    </div>

                    <div className="col-md-12 mb-4">
                        <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                            <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                <h4 className="mb-0 fw-bold">Employee List</h4>
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
                                                    <th>Job Title</th>
                                                    <th>Department</th>
                                                    <th>Site</th>
                                                    <th>Salary</th>
                                                    <th>Start Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {employees.length > 0 ? (
                                                    employees.map((employee, index) => (
                                                        <tr key={employee._id}>
                                                            <td>{index + 1}</td>

                                                            <td>
                                                                <img
                                                                    src={ProfileImg}
                                                                    alt=""
                                                                    className="tbl-empImg"
                                                                />
                                                                {employee.name}
                                                            </td>

                                                            <td>{employee.username}</td>
                                                            <td>{employee.role}</td>
                                                            <td>NA</td>
                                                            <td>NA</td>
                                                            <td>{employee.wages_per_day}</td>
                                                            <td>NA</td>

                                                            <td>
                                                                <button
                                                                    className="btn btn-danger rounded-5"
                                                                    onClick={() => handleDelete(employee._id)}
                                                                >
                                                                    Undo
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="9" className="text-center">
                                                            No employees found
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
        </div>
    );
};

export default Archives;