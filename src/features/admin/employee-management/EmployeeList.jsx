import React from 'react'
import profileImg from '../../../assets/images/pro-img.png'
import EmployeeTable from './components/EmployeeTable'

const EmployeeList = () => {
    return (
        <div>
            <div className="container-fluid employee-page">
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Employee Management</h1>
                        </div>

                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">

                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold">Employee List</h4>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-dark rounded-5"
                                            data-bs-toggle="modal"
                                            data-bs-target="#addEmployeeModal"
                                        >
                                            <span className="me-2">
                                                <i className="fa-solid fa-circle-plus"></i>
                                            </span>
                                            Add Employee
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <EmployeeTable />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EmployeeList