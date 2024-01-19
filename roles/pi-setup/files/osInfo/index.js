const express = require('express');
const si = require('systeminformation');
const app = express();

async function getAllData() {
	const osInfo = await si.osInfo();
	const graphicsInfo = await si.graphics();
	const cpuInfo = await si.cpu();
	const fsSizeInfo = await si.fsSize();
	const cpuTemperatureInfo = await si.cpuTemperature();
	const memInfo = await si.mem();
	const systemInfo = await si.system();

	return {
		osInfo,
		graphicsInfo,
		cpuInfo,
		fsSizeInfo,
		cpuTemperatureInfo,
		memInfo,
		systemInfo,
	};
}

app.get('/', async (req, res) => {
	try {
		const allData = await getAllData();
		res.json(allData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
