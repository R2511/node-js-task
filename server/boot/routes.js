// module.exports = function(app) {
// var User = app.models.user;
// 	var Party = app.models.party;
// 	var AccessToken = app.models.AccessToken;
//   app.post('/getusers', function(req, res) {
// 		users.getusers({
// 			username : req.body.username,
// 			password : req.body.password
//
// 		}, 'user', function(err, token) {
// 			var responseData = {};
// 			console.log(err);
// 			if (err) {
// 				responseData = {
// 						title : err.code,
// 						content : err,
// 						redirectToLinkText : 'Try again',
// 						statusCode : 401
// 				};
// 				res.send(responseData);
// 				return;
// 			}
// 			req.session.createdTime = new Date().getTime();
//
// 			 responseData = {
// 					username : req.body.username,
// 					accessToken : token.id,
// 					user : token,
// 					statusCode : 200
// 			};
// 			res.send(responseData);
//
//
// 		});
// 	});
// //log a user out
// 	app.post('/logout', function(req, res, next) {
// 		if (!req.body.accessToken)
// 			return res.sendStatus(401);
// 		users.logout(req.accessToken, function(err) {
// 			if (err)
// 				return next(err);
// 			res.redirect('/');
// 		});
// 	});
// };
