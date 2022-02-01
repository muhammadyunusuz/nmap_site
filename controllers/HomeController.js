const checkTCP = require("../modules/checkTCP");
const checkUDP = require("../modules/checkUDP");

module.exports = class HomeController {
	static async HomeGetController(req, res) {
		try {
			res.render("index");
		} catch (error) {
			console.log(error);
		}
	}
	static async HomeScanController(req, res) {
		let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		console.log(ip);

		if (ip.substr(0, 7) == "::ffff:") {
			ip = ip.substr(7);
		}
		// const IP = `2604:a880:400:d0::1d31:d001`;

		const udp = await checkUDP(ip);
		const tcp = await checkTCP(ip);

		res.render("results", {
			udp,
			tcp,
		});
	}
};
