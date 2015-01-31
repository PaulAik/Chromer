var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = {

	saveURL: function(url, user, done) {
		var insertQuery = "INSERT INTO urls ( url, userId ) values (?,?)";

		var urlObj = {
			url: url,
			userId: user.id,
		}

		connection.query(insertQuery, [url, user.id], function(err, rows) {
			urlObj.id = rows.insertId;

			return done(null, urlObj);
		});
	}
}