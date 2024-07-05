import React, { Fragment } from "react";
import "./Dashboard/style.css";

const DashboardCard = ({ information, count, isCustomer, title }) => {
	return (
		<Fragment>
			<div>
				<div className='row'>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:"#fff"
									}}>
									<div className='media d-flex'>
										<div className='media-body  text-left'>
											<h3 className='' style={{color:"#FE4F00"}}>{count?.id ? count?.id : 0}</h3>
											<span className='' style={{color:"#FE4F00"}}>Invoice</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-cloud-download font-large-2 float-right'
												style={{ color: "#FE4F00	" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"#fff",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className='' style={{color:"#FE4F00"}}>
												{information?.total_amount
													? information?.total_amount
													: 0}
											</h3>
											<span className='' style={{color:"#FE4F00"}}>Total Amount</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-rocket font-large-2 float-right'
												style={{ color: "#FE4F00" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"#fff",
									}}>
									<div className='media d-flex'>
										<div className='media-body text-left'>
											<h3 className='' style={{color:"#FE4F00"}}>
												{information?.profit ? information?.profit : 0}
											</h3>
											<span className='' style={{color:"#FE4F00"}}>Total Profit</span>
										</div>
										<div className='align-self-center'>
											<i
												className='icon-wallet font-large-2 float-right'
												style={{ color: "#FE4F00" }}></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xl-3 col-sm-6 col-12'>
						<div className='card dashboard-card'>
							<div className='card-content'>
								<div
									className='card-body dashboard-card-body'
									style={{
										borderRadius: "10px",
										background:
											"#fff",
									}}>
									{isCustomer ? (
										<div className='media d-flex'>
											<div className='media-body text-left'>
												<h3 className='' style={{color:"#FE4F00"}}>
													{information?.paid_amount
														? information?.paid_amount
														: 0}
												</h3>
												<span className='' style={{color:"#FE4F00"}}>Paid Amount</span>
											</div>
											<div className='align-self-center'>
												<i
													className='icon-wallet font-large-2 float-right'
													style={{ color: "#FE4F00" }}></i>
											</div>
										</div>
									) : (
										<div className='media d-flex'>
											<div className='media-body text-left'>
												<h3 className=''>
													{information?.due_amount
														? information?.due_amount
														: 0}
												</h3>
												<span className=''>Due Amount</span>
											</div>
											<div className='align-self-center'>
												<i
													className='icon-wallet font-large-2 float-right'
													style={{ color: "#fff	" }}></i>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default DashboardCard;
