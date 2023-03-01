import React, { useMemo, useState } from "react";
import Pdf from "react-to-pdf";
import { QRCodeSVG } from "qrcode.react";
import data from "./assets/qrcode.json";

const options = {
	orientation: "landscape",
	unit: "mm",
	format: [297, 210],
	margin: 1,
};

function Group({ group, index, groupsCount, label }) {
	const ref = React.createRef();

	return (
		<div
			style={{
				display: "flex",
				placeContent: "center",
				placeItems: "center",
				flexDirection: "column",
			}}
		>
			<Pdf targetRef={ref} filename="code-example.pdf" options={options}>
				{({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
			</Pdf>
			<div ref={ref}>
				<center>
					<div>
						Page: {index} of {groupsCount}{" "}
					</div>
				</center>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 200px)",
						gridAutoRows: "1fr 1fr 1fr",
						placeContent: "center",
						placeItems: "center",
						padding: "10px",
						gap: "0px 50px",
					}}
				>
					{group.map((qr) => {
						return (
							<div
								style={{
									display: "flex",
									flexFlow: "column",
									placeContent: "center",
									placeItems: "center",
									padding: "10px",
								}}
							>
								<QRCodeSVG
									value={JSON.stringify(qr.qrcode)}
									width={"180px"}
									height={"180px"}
								/>
								<div style={{ padding: "1rem" }}>
									{label} {qr.tokenId}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

function App() {
	// const [groups, setGroups] = useState([]);
	const chunk = (array, size) =>
		array.reduce((acc, _, i) => {
			if (i % size === 0) acc.push(array.slice(i, i + size));
			return acc;
		}, []);

	const groups = useMemo(() => {
		return chunk(data, 12);
	});
	return (
		<div>
			{groups.map((g, i) => {
				return (
					<Group
						group={g}
						index={i + 1}
						groupsCount={groups.length}
						label="KIDS"
					/>
				);
			})}
		</div>
	);
}

export default App;
