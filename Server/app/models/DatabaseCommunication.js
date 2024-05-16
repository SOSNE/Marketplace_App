const mysql = require('mysql');
const fs = require('fs');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "marketplace"
});

async function GetOffersDatabase() {
    const itemData = new Promise((resolve, reject) => {
        const sql =  `SELECT items.ItemId, items.ItemName, items.Description, items.Price, users.Username FROM users JOIN items ON users.UserID = items.UserID;`
         con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
    const finalData = new Promise(async (resolve, reject) => {
        const promises = [];
        const asyncItemData = await  itemData;
        for (let i = 0; i < asyncItemData.length; i++) {
            promises.push(new Promise((innerResolve, innerReject) => {
                const ItemId = asyncItemData[i].ItemId;
                con.query(`SELECT PhotoId FROM photos WHERE ItemId = ${ItemId};`, function (err, result) {
                    if (err) {
                        innerReject(err);
                    } else {
                        asyncItemData[i].PhotoId = result;
                        innerResolve();
                    }
                });
            }));
        }
        await Promise.all(promises);
        resolve(asyncItemData);

    })
    return await finalData;
}

function GetSignUpDataFromDatabase() {
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

function AddUserInfo(UserId, FirstName = null, LastName = null, DateOfBirth = null, Gender = null, PhoneNumber = null, Address = null, City = null, PostalCode = null, Country = null){
    const sql = `INSERT INTO 
                    userprofiles (UserID, FirstName, LastName, DateOfBirth, Gender, Address, City, PostalCode, Country, PhoneNumber) 
                VALUES (${UserId}, ${FirstName == null ? FirstName : `'${FirstName}'`}, 
${LastName == null ? LastName : `'${LastName}'`}, 
${DateOfBirth == null ? DateOfBirth : `'${DateOfBirth}'`}, 
${Gender == null ? Gender : `'${Gender}'`}, 
${Address == null ? Address : `'${Address}'`}, 
${City == null ? City : `'${City}'`}, 
${PostalCode == null ? PostalCode : `'${PostalCode}'`}, 
${Country == null ? Country : `'${Country}'`}, 
${PhoneNumber == null ? PhoneNumber : `'${PhoneNumber}'`})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function UpdateUserInfo(UserId, FirstName = null, LastName = null, DateOfBirth = null, Gender = null, PhoneNumber = null, Country = null, City = null, Address = null, PostalCode = null){
    const sql = `UPDATE userprofiles set
                    FirstName = ${FirstName == null ? FirstName : `'${FirstName}'`},
                    LastName = ${LastName == null ? LastName : `'${LastName}'`},
                    DateOfBirth = ${DateOfBirth == null ? DateOfBirth : `'${DateOfBirth}'`},
                    Gender = ${Gender == null ? Gender : `'${Gender}'`},
                    Address = ${Address == null ? Address : `'${Address}'`},
                    City = ${City == null ? City : `'${City}'`},
                    PostalCode = ${PostalCode == null ? PostalCode : `'${PostalCode}'`},
                    Country = ${Country == null ? Country : `'${Country}'`},
                    PhoneNumber = ${PhoneNumber == null ? PhoneNumber : `'${PhoneNumber}'`}
                    WHERE 
                    UserID = ${UserId}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function SignUpDataBase(username, email, password) {
    let date = new Date()
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    let dateString = `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const sql = `INSERT INTO users ( Username, Email, Password, RegistrationDate, email_confirmed) VALUES ('${username.toString()}', '${email.toString()}', '${password.toString()}', '${dateString}', 0)`;
    con.query(sql, function (err, result) {
        console.log("adding to database values", username, email, password, dateString)
        if (err) throw err;
    });
    con.query(`SELECT LAST_INSERT_ID() AS UserId`, function (err, result) {
        if (err) throw err;
        const UserId = result[0].UserId;
        console.log(UserId)
        AddUserInfo(UserId);
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
        //console.log("logInDataFromDataBase", email);
        const sql = `SELECT users.UserID, users.Password, users.Username ,userprofiles.FirstName, userprofiles.LastName, userprofiles.Gender, userprofiles.DateOfBirth FROM users Join userprofiles ON users.UserID = userprofiles.UserID WHERE users.Email = '${email}';`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                //console.log(result);
                resolve(result);
            }
        });
    });
}

function AddNewOfferToDatabase(UserID, price, description, productName, photoString){
    con.query(`INSERT INTO items (UserID, ItemName, Description, Price) 
                   VALUES (${UserID}, '${productName.toString()}', '${description.toString()}', ${price});`, function (err) {
        if (err) throw err;
    });

    con.query(`SELECT LAST_INSERT_ID() AS ItemID`, function (err, result) {
        if (err) throw err;
        const ItemID = result[0].ItemID;
        con.query(`INSERT INTO photos (ItemId, UserId, PhotoBlob)
                       VALUES (${ItemID}, ${UserID}, '${photoString}');`, function (err) {
            if (err) throw err;
            //console.log("done");
        });
    });
}
function GetPhotoFromDataBase(PhotoId){
   return new Promise((resolve, reject) => {
        const sql = `SELECT PhotoBlob FROM photos WHERE PhotoId = '${PhotoId}';`;
        con.query(sql, async function (err, result) {
            if (err) {
                reject(err);
            }else {
                const buffer = Buffer.from(result[0].PhotoBlob, 'binary');
                const base64String = buffer.toString('utf-8');
                resolve(base64String);
            }
        })
    })
}

function GetUserInfoFromDataBase(UserId){
    return new Promise((resolve, reject) => {
        const sql = `SELECT users.Email, users.Username ,userprofiles.FirstName, userprofiles.LastName, userprofiles.Gender, userprofiles.PhoneNumber, userprofiles.Country, userprofiles.City, userprofiles.Address FROM users Join userprofiles ON users.UserID = userprofiles.UserID WHERE users.UserID = '${UserId}';`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                //console.log(result);
                resolve(result);
            }
        });
    });
}
module.exports = {
    GetOffersDatabase,
    GetSignUpDataFromDatabase,
    SignUpDataBase,
    ConfirmEmailToDataBase,
    LogInDataFromDataBase,
    AddNewOfferToDatabase,
    GetPhotoFromDataBase,
    GetUserInfoFromDataBase,
    AddUserInfo,
    UpdateUserInfo
};