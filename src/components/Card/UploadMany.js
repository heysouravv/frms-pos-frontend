import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./card.css";

const UploadMany = ({ urlPath }) => {
	const [loader, setLoader] = useState(false);
	const [file, setFile] = useState();

	const fileReader = new FileReader();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	function csvToArray(csv) {
		const lines = csv.split("\n");
		const result = [];
		const headers = lines[0].split(",");

		for (let i = 1; i < lines.length; i++) {
			const currentLine = lines[i].split(",");

			// Skip empty lines
			if (currentLine.length === headers.length) {
				const obj = {};
				for (let j = 0; j < headers.length; j++) {
					// Remove surrounding quotes from key and value
					const key = headers[j].trim().replace(/(^['"]|['"]$)/g, "");
					const value = currentLine[j].trim().replace(/(^['"]|['"]$)/g, "");
					obj[key] = value;
				}
				result.push(obj);
			}
		}
		return result;
	}

	const csvFileToArray = (string) => {
		const array = csvToArray(string);

		const resp = axios.post(`${urlPath}?query=createmany`, array);
		resp
			.then((d) => {
				if (d.statusText === "OK") {
					setLoader(false);
					toast.success("Uploaded Success");
					window.location.reload();
				} else {
					toast.error("Something went wrong, Check your CSV file ");
					setLoader(false);
				}
			})
			.catch((err) => {
				console.log(err, "err");
				toast.error("Something went wrong, Check your CSV file ");
				setLoader(false);
			});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		} else {
			toast.error("Please select a file");
			setLoader(false);
		}
	};

	return (
		<div className='text-center mt-2 '>
			<form className='form-group '>
				<input
					className='form-control'
					type={"file"}
					id={"csvFileInput"}
					accept={".csv"}
					onChange={handleOnChange}
				/>
				<br />

				<Button
					className='mt-2'
					type='primary'
					disabled={
						!file ||
						!file.name.match(/.(csv)$/i) ||
						!file.type.match(/.(csv)$/i)
					}
					htmlType='submit'
					shape='round'
					loading={loader}
					onClick={handleOnSubmit}>
					Import From CSV
				</Button>
			</form>
		</div>
	);
};

export default UploadMany;
