import CalendarWidget from "./components/CalendarWidget";
import LeaveRequestsTable from "./components/LeaveRequestsTable";
import TotalAppImg from '../../../assets/images/interviewImg.svg';
import StatCard from "./components/StatCard";
import { useGetAdminStatsQuery } from "../api/dashboardApi";

const AdminDashboard = () => {

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetAdminStatsQuery();

  if (statsLoading) return <p>Loading dashboard...</p>;
  if (statsError) return <p>Somthing went wrong.</p>;

  return (
    <>
      <div className="container-fluid">
        <div className="px-lg-5 px-0">
          <div className="row">
            <div className="col-12 px-4">
              <h1 className="my-4">Welcome, Admin</h1>
            </div>
            <div className="col-lg-8 mb-4">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                    <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                      <h4 className="mb-0 fw-bold">Employees Availability</h4>
                    </div>
                    <div className="card-body">
                      <div className="row g-2 row-deck">
                        <div className="col-md-6 col-sm-6">
                          <StatCard
                            cardTitle="Present"
                            icon="fa-user-check"
                            iconColor="text-success"
                            count={stats.totalPresent}
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <StatCard
                            cardTitle="Late Coming"
                            icon="fa-clock"
                            iconColor="text-warning"
                            count={stats.totalLateComing}
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <StatCard
                            cardTitle="Absent"
                            icon="fa-circle-xmark"
                            iconColor="text-danger"
                            count={stats.totalAbsent}
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <StatCard
                            cardTitle="Leave Applications"
                            icon="fa-umbrella-beach"
                            iconColor="text-primary"
                            count={stats.totalLeaveApplications}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                    <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                      <h4 className="mb-0 fw-bold ">Employees Availability</h4>
                      <h4 className="mb-0 fw-bold">423</h4>
                    </div>
                    <div className="card-body">
                      <div className="row h-100">
                        <div className="col-12">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                    <div className="card-body">
                      <CalendarWidget />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                    <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                      <h4 className="mb-0 fw-bold ">Today Leave Requests</h4>
                    </div>
                    <div className="card-body">
                      <LeaveRequestsTable />
                      {/* <div className="table-responsive">
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
                            {todayRequests
                              ?.filter((request) => request.status === "pending")
                              ?.map((request, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{request.user_id.name}</td>
                                  <td>{request.leave_type}</td>
                                  <td>{request.from_date}</td>
                                  <td>{request.to_date}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card rounded-5 bg-danger mb-4">
                <div className="card-body row">
                  <div className="col">
                    <div className="d-flex justify-content-center mt-5">
                      <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                        <i className="fa-solid fa-file-lines fs-1"></i>
                      </div>
                    </div>

                    <h1 className="mt-3 mb-0 fw-bold text-white text-center">1546</h1>
                    <p className="text-white text-center">Applications</p>
                  </div>
                  <div className="col d-flex align-items-center justify-content-center">
                    <img className="img-fluid" src={TotalAppImg} alt="interview" />
                  </div>
                </div>
              </div>
              {/* for small and medium screens */}
              <div className="ipad-cards">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-12 mb-3">
                    <div className="card rounded-5 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center flex-fill">
                          <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                            <i className="fa-solid fa-users fs-3 text-white"></i>
                          </div>
                          <div className="d-flex flex-column ps-3 flex-fill">
                            <h6 className="fw-bold mb-0 fs-4">246</h6>
                            <span className="text-muted">Interviews</span>
                          </div>
                          <i className="fa-solid fa-chart-simple text-muted fs-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12  col-lg-12 col-md-6 mb-3">
                    <div className="card rounded-5 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center flex-fill">
                          <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                            <i className="fa-solid fa-user-tie fs-3 text-white"></i>
                          </div>
                          <div className="d-flex flex-column ps-3 flex-fill">
                            <h6 className="fw-bold mb-0 fs-4">101</h6>
                            <span className="text-muted">Hired</span>
                          </div>
                          <i className="fa-solid fa-signal text-muted fs-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" ipad-cards">
                <div className="row">
                  <div className="col-12 col-lg-12 col-md-6 mb-3">
                    <div className="card rounded-5 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center flex-fill">
                          <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                            <i className="fa-solid fa-users fs-3 text-white"></i>
                          </div>
                          <div className="d-flex flex-column ps-3 flex-fill">
                            <h6 className="fw-bold mb-0 fs-4">246</h6>
                            <span className="text-muted">Interviews</span>
                          </div>
                          <i className="fa-solid fa-chart-simple text-muted fs-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-12 col-md-6 mb-3">
                    <div className="card rounded-5 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center flex-fill">
                          <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                            <i className="fa-solid fa-user-tie fs-3 text-white"></i>
                          </div>
                          <div className="d-flex flex-column ps-3 flex-fill">
                            <h6 className="fw-bold mb-0 fs-4">101</h6>
                            <span className="text-muted">Hired</span>
                          </div>
                          <i className="fa-solid fa-signal text-muted fs-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard;