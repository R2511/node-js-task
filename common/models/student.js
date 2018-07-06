'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
module.exports = function(student) {
  student.studentupdate = function (context,cb) {
      var student_marks =  student.app.models.student_marks;
      var change = {
          subject: context.subject,
          marks: context.marks
        }
  student_marks.updateAll({student_id:context.student_id}, change, function(err, model){
      console.log(model);
      return cb(err,model);
      if(err){
         cb(err);
       }
     });
   };
  student.remoteMethod('studentupdate', {
    accepts: {
        arg: 'data',
        type: 'json',
        http: {
          source: 'body'
        }
      },
        returns: {
        arg: 'result',
        type: 'string'
      },
      http: {
        path: '/studentupdateinfo',
        verb: 'post'
      }
    });

  };
