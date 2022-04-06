// GENERAL

const getRand = (from, to) => Math.floor(Math.random() * ((to - from) + 1)) + from;

const startElapsedTime = () => {
	return process.hrtime();
};

const getElapsedTime = (timer) => {
	const padLeft = (num, size) => {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
	const ms = parseInt(process.hrtime(timer)[1] / 1000000);
	const paddedMs = padLeft(ms, 3);
	return `${process.hrtime(timer)[0]}.${paddedMs} seconds`;
}

// GET DATA
const getEmployees = async () => {
	return new Promise((resolve, reject) => {
		const ms = getRand(1000, 3000);
		const num = getRand(1, 2);
		setTimeout(() => {
			if (num !== 1) {
				resolve([{ name: "Henri", age: 33 }, { name: "Randal", age: 34 }]);
			} else {
				reject(new Error('API not available at the moment.'));
			}
		}, ms);
	});
};

const getEvents = async () => new Promise((resolve, reject) => {
	const ms = getRand(1000, 3000);
	const num = getRand(1, 2);
	setTimeout(() => {
		if (num !== 1) {
			resolve([{ date: "2022-04-06", eventName: 'All-Hands Meeting' }, { date: "2022-04-08", eventName: 'Sales Meeting' }]);
		} else {
			reject(new Error('Calendar service currently down.'));
		}
	}, ms);
});

const apiDataService = async () => {

	const timer = startElapsedTime();

	const obj = {
		employees: [],
		errors: [],
		info: {
			serviceName: 'API Data Service',
			version: '3.021'
		}
	};

	// employees
	try {
		obj.employees = await getEmployees();
	}
	catch (err) {
		obj.employees = [];
		obj.errors.push({ dataSource: 'employees', error: err.message })
	}

	// events - with async/await
	try {
		obj.events = await getEvents();
	}
	catch (err) {
		obj.events = [];
		obj.errors.push({ dataSource: 'events', error: err.message })
	}
	obj.info.elapsedTime = getElapsedTime(timer);
	return obj;

	// events - with then()
	/*
	obj.info.elapsedTime = getElapsedTime(timer);
	return getEvents()
		.then(events => {
			obj.events = events;
			return obj;
		})
		.catch(err => {
			obj.events = [];
			obj.errors.push({ dataSource: 'events', error: err.message });
			return obj;
		});
	*/
}

(async () => {
	const data = await apiDataService();
	console.log(data);
})();