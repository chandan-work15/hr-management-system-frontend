import React from 'react'
import { useGetTodayLeaveRequestsQuery } from '../../api/dashboardApi';

const LeaveRequestsTable = () => {

    const {
        data: LeaveRequestsTableData,
        isLoading: leaveLoading,
    } = useGetTodayLeaveRequestsQuery();

    if (leaveLoading) return <p>Loading leave requests...</p>;

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
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LeaveRequestsTableData.map((request, index) => (
                            <tr key={request._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{request.user_id.name}</td>
                                <td>{request.leave_type}</td>
                                <td>{request.from_date}</td>
                                <td>{request.to_date}</td>
                                <td>
                                    <span
                                        className={`badge rounded-pill pb-2 ${request.status === 'approved' ? 'bg-success' : request.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>{request.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaveRequestsTable