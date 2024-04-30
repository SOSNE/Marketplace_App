const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "marketplace"
});

function GetOffersDatabase() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT items.ItemName, items.Description, items.Price, users.Username FROM users JOIN items ON users.UserID = items.UserID;"
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
        const sql = "SELECT Username, Email, email_confirmed FROM users ;"
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
        const sql = `SELECT users.Password, users.Username ,userprofiles.firstname , userprofiles.lastname , userprofiles.gender , userprofiles.dateofbirth FROM users Join userprofiles ON users.UserID = userprofiles.UserID WHERE users.Email = '${email}';`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
}

function AddNewOfferToDatabase(email, price, description, productName, photoString){

    con.query(`SELECT UserID FROM users WHERE Email = '${email}';`, function (err, result) {
        if (err) throw err;
        const UserID = result[0].UserID;

        con.query(`INSERT INTO items (UserID, ItemName, Description, Price) 
                   VALUES (${UserID}, '${productName.toString()}', '${description.toString()}', ${price});`, function (err) {
            if (err) throw err;
        });

        con.query(`SELECT LAST_INSERT_ID() AS ItemID`, function (err, result) {
            if (err) throw err;
            console.log(result);
            const ItemID = result[0].ItemID;
            con.query(`INSERT INTO photos (ItemId, UserId, PhotoBlob)
                       VALUES (${ItemID}, ${UserID}, '${photoString}');`, function (err) {
                if (err) throw err;
                console.log("done");
            });
        });
    });
}

module.exports = {
    GetOffersDatabase,
    GetSignInDataFromDatabase,
    SignInDataBase,
    ConfirmEmailToDataBase,
    LogInDataFromDataBase,
    AddNewOfferToDatabase
};