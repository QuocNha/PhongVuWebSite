import React from "react"

const searchTime = () => {
    return <React.Fragment>
        <div className="section-statistical1__report__title">
            <button
                // className={activeTime===false?"btn-history active":"btn-history"}
                className="btn-history "
                //onClick={handleThisTime}
            >
                Hôm nay
                  </button>
            <button
                className="btn-history"
                //onClick={handleYesterday}
            >
                Hôm qua
                  </button>
            <button
                className="btn-history"
                //onClick={handleThisWeek}
            >
                Tuần này
                  </button>
            <button
                className="btn-history"
                //onClick={handleThisMonth}
            >
                Tháng này
                  </button>
            {/* <div>
                    <button className="btn-see"
                      onClick={handleSeeDashboard}
                    >
                    Xem
                    </button>
                  </div> */}
        </div>
    </React.Fragment>
}
export default searchTime;