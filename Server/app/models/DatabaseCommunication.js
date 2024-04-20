const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "marketplace"
});

function GetOffersDatabase() {
    con.connect;
    return new Promise((resolve, reject) => {
        const sql = "SELECT items.ItemName, items.Description, items.Price, users.Username FROM users JOIN items ON users.UserID = items.UserID;"
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        //con.end()
    });
}
function GetSignInDataFromDatabase() {
    con.connect;
    return new Promise((resolve, reject) => {
        const sql = "SELECT Username, Email, email_confirmed FROM users;"
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        //con.end()
    });
}
function SignInDataBase(username, email, password) {
        con.connect;
        let date = new Date()
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const day = date.getDate();
        let dateString = `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        const sql = `INSERT INTO users ( Username, Email, Password, RegistrationDate, email_confirmed) VALUES ('${username.toString()}', '${email.toString()}', '${password.toString()}', '${dateString}', 0)`;
        con.query(sql, function (err, result) {
            console.log("adding to database values", username, email, password, dateString)
            if (err) throw err;
        });
    con.end()
}

function ConfirmEmailToDataBase(email){
    con.connect;
    const sql = `UPDATE users SET email_confirmed = 1 WHERE Email = '${email}';`;
    con.query(sql, function (err, result) {
        console.log("setting email_confirmed = 1 to account with email: ", email)
        if (err) throw err;
    });
    //con.end()
}

function LogInDataFromDataBase(email){
    con.connect;
    return new Promise((resolve, reject) => {
        const sql = `SELECT Password, Username FROM users WHERE Email = '${email}';`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        //con.end()
    });

}

function AddNewOfferToDatabase(email, price, description, productName, photoString){
    con.connect;

//         /* */
//         const sql = `SELECT UserID INTO @UserID
// FROM users
// WHERE Email = '${email}';
//
//
//
//
// INSERT INTO items (UserID, ItemName, Description, Price) VALUES (2, '${productName.toString()}', '${description.toString()}', 20);
//
// SELECT LAST_INSERT_ID() INTO @ItemId;
//
//
// INSERT INTO photos (ItemId, UserId, PhotoBlob)
// VALUES (1, 2, '${photoString}');`
//
//         con.query(sql, function (err, result) {
//             console.log("adding to database values")
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });

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
                con.end()
            });
        });
    });

//     const sqlSec = `SELECT userID INTO @UserID
// FROM users
// WHERE email = ${email};
//
// INSERT INTO photos (ItemId, UserID, ItemName, Description, Price)
// VALUES (0, @UserID, '${productName}', '${description}', '${price}');`
//     con.query(sqlSec, function (err) {
//         console.log("adding to database values")
//         if (err) throw err;
//     });


    // const sql = `SELECT UserID FROM users where email = '${email}';`;
    // con.query(sql, function (err, result) {
    //     const sqlSec = `INSERT INTO photos (PhotoId, UserId, PhotoBlob) VALUES ('','${result}','${photoString}')`;
    //     con.query(sqlSec, function (err) {
    //
    //         //console.log("setting email_confirmed = 1 to account with email: ", email)
    //         if (err) throw err;
    //     });
    //     console.log("setting email_confirmed = 1 to account with email: ", email)
    //     const sqlThird = `INSERT INTO items(ItemId, UserID, ItemName, Description, Price) VALUES ('','${result}','${productName}','${description}','${price}')`;
    //     con.query(sqlSec, function (err) {
    //
    //         //console.log("setting email_confirmed = 1 to account with email: ", email)
    //         if (err) throw err;
    //     });
    //     if (err) throw err;
    // });

}

module.exports = {
    GetOffersDatabase,
    GetSignInDataFromDatabase,
    SignInDataBase,
    ConfirmEmailToDataBase,
    LogInDataFromDataBase,
    AddNewOfferToDatabase
};
