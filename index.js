// GENERAL

const getRand = (from, to) => Math.floor(Math.random() * ((to - from) + 1)) + from;

const startElapsedTime = () => {
	return process.hrtime();
};

const getElapsedTime = (timer) => {
	return `${process.hrtime(timer)[0]}.${process.hrtime(timer)[1]} seconds`;
}

// GET DATA
const getEmployees = new Promise((resolve, reject) => {
	const ms = getRand(1000, 3000);
	const num = getRand(1, 2);
	setTimeout(() => {
		if (num !== 1) {
			resolve([{ name: "Henri", age: 33 },{ name: "Randal", age: 34 }]);
		} else {
			reject(new Error('API not available at the moment.'));
		}
	}, ms);
});

const apiDataService = async () => {
	// getName.then((text) => console.log(text));
	const timer = startElapsedTime();
	const obj = {
		employees: [],
		errors: {},
		info: {
			serviceName: 'API Data Service',
			version: '3.021'
		}
	};

	try {
		obj.employees = await getEmployees;
	}
	catch (err) {
		obj.employees = [];
		obj.errors = [];
		obj.errors.push({ dataSource: 'employees', error: err.message })
	}
	// const result = await getName;
	// console.log(result);
	// console.log(await getInfo);
	obj.info.elapsedTime = getElapsedTime(timer);
	return obj;
}

(async () => {
	const data = await apiDataService();
	console.log(data);
})();