const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
async function run() {
	if (!fs.existsSync("../.env")) {
		let done = false;

		rl.question("is this correct?\n", function (bool) {
			if (bool.toLowerCase() == "y" || bool.toLowerCase() == "yes") {
				done = true;
				rl.close();
			} else run();
		});
	}
}

module.exports = { run };
