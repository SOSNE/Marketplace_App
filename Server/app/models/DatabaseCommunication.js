const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "marketplace"
});
con.connect();
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
function SignInDataBase(username, email, password) {

        let date = new Date()
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const day = date.getDate();
        let dateString = `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        const sql = `INSERT INTO users ( Username, Email, Password, RegistrationDate, email_confirmed) VALUES ('${username.toString()}', '${email.toString()}', '${password.toString()}', '${dateString}', 0)`;
        con.query(sql, function (err, result) {
            console.log("adding to database values", username, email, password, dateString)
            if (err) throw err;
        });
}

function ConfirmEmailToDataBase(email){
    const sql = `UPDATE users SET email_confirmed = 1 WHERE Email = '${email}';`;
    con.query(sql, function (err, result) {
        console.log("setting email_confirmed = 1 to account with email: ", email)
        if (err) throw err;
    });
}

function LogInDataFromDataBase(email){
    return new Promise((resolve, reject) => {
        const sql = `SELECT Password, Username FROM users WHERE Email = '${email}';`
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
    GetSignInDataFromDatabase,
    SignInDataBase,
    ConfirmEmailToDataBase,
    LogInDataFromDataBase
};
