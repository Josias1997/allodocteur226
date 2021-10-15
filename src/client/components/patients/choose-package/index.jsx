import React from 'react';
import { Link } from "react-router-dom";
import List from './packageList';

const ChoosePackage = () => {
	return (
		<div>
			<div className="breadcrumb-bar">
		    <div className="container-fluid">
		        <div className="row align-items-center">
		            <div className="col-md-12 col-12">
		                <nav aria-label="breadcrumb" className="page-breadcrumb">
		                    <ol className="breadcrumb">
		                        <li className="breadcrumb-item"><Link to="/home">Accueil</Link></li>
		                        <li className="breadcrumb-item active" aria-current="page">Choix Package Assurance</li>
		                    </ol>
		                </nav>
		                <h2 className="breadcrumb-title">Choix Package Assurance</h2>
		            </div>
		        </div>
		    </div>
			</div>
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8 col-xl-9">
							<List />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ChoosePackage;
