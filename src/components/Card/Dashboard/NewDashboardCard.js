import React, { Fragment } from "react";
import "./style.css";

const NewDashboardCard = ({ information }) => {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background:"#fff"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="" style={{color:"#FE4F00"}}>
                        {information?.purchase_total
                          ? information?.purchase_total
                          : 0}
                      </h3>
                      <span className="" style={{color:"#FE4F00"}}>Total Purchase</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-cloud-download font-large-2 float-right"
                        style={{ color: "#FE4F00" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "#fff"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="" style={{color:"#FE4F00"}}>
                        {information?.sale_total ? information?.sale_total : 0}

                      </h3>
                      <span className="" style={{color:"#FE4F00"}}>Total Sale</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-rocket font-large-2 float-right"
                        style={{ color: "#FE4F00" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "#fff"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="" style={{color:"#FE4F00"}}>
                        {information?.sale_profit
                          ? information?.sale_profit
                          : 0}
                      </h3>
                      <span className="" style={{color:"#FE4F00"}}>Total Profit</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-wallet font-large-2 float-right"
                        style={{ color: "#FE4F00" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body dashboard-card-body" style={{borderRadius: "10px", background: "#fff"}}>
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="" style={{color:"#FE4F00"}}>
                        {information?.sale_count ? information?.sale_count : 0}
                      </h3>
                      <span className="" style={{color:"#FE4F00"}}>Total Sale</span>
                    </div>
                    <div className="align-self-center">
                      <i
                        className="icon-wallet font-large-2 float-right"
                        style={{ color: "#FE4F00" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewDashboardCard;
