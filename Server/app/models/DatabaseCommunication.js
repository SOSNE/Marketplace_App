const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "marketplace"
});

function GetOffersDatabase() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT items.ItemName, items.Description, items.Price, userprofiles.FirstName, users.Username FROM users JOIN items ON users.UserID = items.UserID JOIN userprofiles ON users.UserID = userprofiles.UserID;"
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function GetSignInDataFromDatabase() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Username, Email, email_confirmed FROM users;"
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = {
    GetOffersDatabase,
    GetSignInDataFromDatabase
};
