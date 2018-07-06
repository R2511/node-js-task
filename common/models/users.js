'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var bcrypt = require('bcrypt');
var config = require('../../server/config.json');
var path = require('path');
var passwordHash = require('password-hash');
var loopback = require('../../node_modules/loopback/lib/loopback');
var LoopBackContext = require('loopback-context');
var utils = require('../../node_modules/loopback/lib/utils');
var SALT_WORK_FACTOR = 10;
var crypto = require('crypto');

module.exports = function(users) {

users.signup = function(context, cb) {
  context.password = passwordHash.generate(context.password);
  users.create(context,function(err,model) {
					console.log(model);
					if(err){
						cb(err);
					}
         else{
           var student = {
             'userId':model.id
           }
         users.app.models.student.create(student,function(err,model){
          console.log(model);
             if(err) {
               cb(err);
             }
             var responseData = {};
					                responseData.title = 'successfull';
					                responseData.statusCode = 200;
					                cb(null, responseData)
                });
            };
        });
};
  users.remoteMethod('signup', {
        http: {
            path: '/signUp',
            verb: 'post'
        },
        accepts: {
            arg: 'data',
            type: 'json',
            http: {
              source:'body'
            }

        },
				returns: {
           arg: 'status',
           type: 'string'
       }
    });

users.signin = function(name,data,cb) {
    var default_ttl = 1000 * 60 * 60 * 24 * 14;
   users.find ({
      where: {
        user_name : name
      }
    },function(err,model){
      if (err) {
         cb(err);
      } else {
        if (model.length > 0) {
            var hash = passwordHash.verify(data,model[0].password);
            if (hash) {
                users.app.models.accessToken.create({
                       ttl: default_ttl,
                       userId: model[0].id
                     },function(err, accessToken) {
                       if (err) {
                           return cb(err);
                         }
                       else{
                         console.log(accessToken);
                          cb(null,'success')
                       }
                 });

            } else {
              console.log('password incorrect');
              cb(null,'password incorrect');
            }
        } else {
          cb(err,'incorrect user_name')
        }
      }
    });
};
users.remoteMethod('signin', {
          http: {
              path: '/signin',
              verb: 'get'
          },
          accepts: [
            { arg: 'user_name',type: 'string'},
            { arg: 'password',type: 'string'}
         ],

          returns: {
             arg: 'status',
             type: 'string'
         }
      });

users.getusers = function(password,cb) {
  users.find({
    where: {
       role: password
    }
  },function(err,model)  {
    if(err){
      cb(err,null)
    }
    else{
      cb(null,model)
    }
  });
};

users.remoteMethod(
    'getusers',
    {
      accepts: [
        { arg: 'role',type: 'string'}
      ],
      http: {
        verb: 'get',
        path: '/getusers'},

      returns:
      { arg: 'status',
       type: 'string'
     }
    });
users.getusersid = function(password,cb) {
      users.find({
        where: {
           id: password
        }
      },function(err,model)  {
        if(err){
          cb(err,null)
        }
        else{
          cb(null,model)
        }
      });
    };
    users.remoteMethod(
        'getusersid',
        {
          accepts: [
            { arg: 'id',type: 'number'}
          ],
          http: {
            verb: 'get',
            path: '/getusersid'},

          returns:
          { arg: 'status',
           type: 'string'
         }
       });

users.change = function (context,cb) {
  console.log(context);
  users.updateAll( {id: context.id}, {password: context.password}, function(err, model){
     return cb(err,model);
     console.log(model);

     if(err){
       cb(err);
     }
   });
 };
users.remoteMethod('change', {
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
      path: '/userupdate',
      verb: 'post'
    }
  });

};
