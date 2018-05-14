var socsjs = require('socsjs');
var quarter = "FA18";
var query = process.argv[2];
var timeout = 15000;
socsjs.findCourse(quarter, query, timeout).then(function(result) {
	if (result === undefined) {
		console.log("course not found");
	}
	var flag = true;
	for (var si in result.sections) {
		s = result.sections[si];
		if (s.isEnrollable && s.openSeats > 0) {
			console.log("%s has %d open seat(s).", s.section, s.openSeats);
			flag = false;
		}
	}
	if (flag) {
		console.log("No open seats for %s", query);
	} else {
		var nodemailer = require('nodemailer');

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'email@address.com',
				pass: 'pass'
			}
		});

		var mailOptions = {
			from: 'email@address.com',
			to: 'email@address.com',
			subject: '[URGENT] Open seats in ' + query,
			text: 'Check WebReg for details.'
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('open seats notification sent: %s', info.response);
			}
		});
	}
}).catch(function(err) {
	console.log(err, "ERROR");
});
