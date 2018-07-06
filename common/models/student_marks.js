'use strict';
module.exports = function(student_marks) {
    student_marks.markdetails = function(context, cb) {
				student_marks.create(context,function(err,model) {
					console.log(model);
					if(err){
						cb(err);
					}
					var responseData = {};
					                responseData.title = 'student added successfully';
					                responseData.statusCode = 200;
					                cb(null, responseData);
				});



    };

    student_marks.remoteMethod('markdetails', {
        http: {
            path: '/markdetails',
            verb: 'post'
        },
        accepts: {
            arg: 'data',
            type: 'json',
            http: {
              source: 'body'
            }
          },
				returns: {
           arg: 'status',
           type: 'string'
       }
    });
  };
