import React from 'react'

const StatCard = React.memo(({ cardTitle, icon, count, iconColor }) => {
    return (
        <div>
            <div className="card border-0 rounded-4">
                <div className="card-body ">
                    <i className={`fa-solid ${icon} fs-3 ${iconColor}`}></i>
                    <h5 className="mt-3 mb-0 fw-bold small-14">{cardTitle}</h5>
                    <span className="text-muted">{count}</span>
                </div>
            </div>
        </div>
    )
});

export default StatCard