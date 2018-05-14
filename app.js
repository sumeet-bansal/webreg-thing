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
			console.log("%s\t%s %s has %d open seat(s).", (new Date()).toString(), query, s.section, s.openSeats);
			flag = false;
		}
	}
	if (flag) {
		console.log("%s\tNo open seats for %s", (new Date()).toString(), query);
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
			text: 'Check WebReg for details. Sent ' + (new Date()).toString()
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('%s\topen seats notification sent: %s', (new Date()).toString(), info.response);
			}
		});
	}
}).catch(function(err) {
	console.log(err, "ERROR");
});
