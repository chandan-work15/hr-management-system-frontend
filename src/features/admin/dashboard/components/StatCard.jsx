import React from 'react'

const StatCard = React.memo(({ cardTitle, icon, count, iconColor }) => {
    return (
        <div>
            <div className="card border-0 rounded-4">
                <div className="card-body ">
                    <div className="d-flex justify-content-between">
                        <div>
                            <i className={`fa-solid ${icon} fs-3 ${iconColor}`}></i>
                            <h5 className="mt-3 mb-0 fw-bold small-14">{cardTitle}</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <h1 className="mb-0 me-3 text-muted text-end"
                            style={{fontSize:'55px', fontWeight:'bold'}}>{count}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default React.memo(StatCard);