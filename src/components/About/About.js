import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import { useAuth } from '../AuthContext';  

export default function About({ resetData, exportData, importData }) {
	const { isLoggedIn } = useAuth();
	const inputFile = useRef(null);
	let navigate = useNavigate();
	const [resetSpinnerState, setResetSpinnerState] = useState(false);
	const [importSpinnerState, setImportSpinnerState] = useState(false);
	const [exportSpinnerState, setExportSpinnerState] = useState(false);

	function handleChange(e) {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			const JSONData = JSON.parse(e.target.result);
			importData(JSONData, () => {
				setImportSpinnerState(false);
				navigate("/");
			});
		};
	}
	useEffect(() => {
		!isLoggedIn && navigate("/login")
		// eslint-disable-next-line
	}, [isLoggedIn])

	return (
		<>
			<div className="container">
				<Fade duration={500}>
					<div className="container my-5">
						<Alert variant="success">
							<Alert.Heading className="text-center">About</Alert.Heading>
							<hr />
							<h4 className="text-center">
								DSA Tracker helps you build your confidence in solving any coding <br /> related question and helps you
								prepare for your placements{" "}
							</h4>
						</Alert>
					</div>
					<div className="container my-5">
						<h2 className="text-center">

							<i>
								{/* <a
									href="https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view"
									target="_blank"
									rel="noopener noreferrer"
								>
									DSA Cracker Sheet
								</a> */}
							</i>{" "}
							{" "}

						</h2>
						<h4 className="text-center my-5">
							{/* Project by{" "}
							<a href="https://www.linkedin.com/in/yash-champaneri-046064205/" target="_blank" rel="noopener noreferrer">
								Yash
							</a>{" "}
							<span role="img" aria-label="code-men">
								👨🏻‍💻
							</span> */}
						</h4>
						<h5 className="text-center">
							<Badge
								variant="danger"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									if (window.confirm("Are you sure you want to reset the progress !")) {
										setResetSpinnerState(true);
										resetData();
									}
								}}
							>
								Reset Progress
								<Spinner animation="border" variant="light" size="sm" style={resetSpinnerState ? {} : { display: "none" }} />
							</Badge>{" "}
							<Badge
								variant="warning"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setExportSpinnerState(true);
									exportData(() => {
										setExportSpinnerState(false);
									});
								}}
							>
								Export Progress
								<Spinner animation="border" variant="light" size="sm" style={exportSpinnerState ? {} : { display: "none" }} />
							</Badge>{" "}
							<Badge
								variant="primary"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									setImportSpinnerState(true);
									inputFile.current.click();
								}}
							>
								Import Progress{" "}
								<Spinner animation="border" variant="light" size="sm" style={importSpinnerState ? {} : { display: "none" }} />
							</Badge>
						</h5>

						<input type="file" id="file" ref={inputFile} style={{ display: "none" }} accept=".json" onChange={handleChange} />
					</div>
				</Fade>
			</div>
		</>
	);
}
