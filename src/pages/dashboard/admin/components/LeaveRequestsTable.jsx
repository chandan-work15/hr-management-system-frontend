import React from 'react'

const LeaveRequestsTable = () => {
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                    <thead>
                        <tr className="table-warning">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Leave Type</th>
                            <th scope="col">From Date</th>
                            <th scope="col">To Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>request.user_id.name</td>
                            <td>request.leave_type</td>
                            <td>request.from_date</td>
                            <td>request.to_date</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaveRequestsTable