const { Staff } = require ("../models/staff");
const { mcdowellConnection } = require("../database/connection");

class staffManagers{
    async getStaff (){
        try {
            const bringStaff = mcdowellConnection.query(`SELECT * FROM staffs`)
            return bringStaff
        } catch (error) {
            return false
        }
    }

    async getStaffMemeber (id){
        try {
            const bringStaff = mcdowellConnection.query(`SELECT * FROM staffs WHERE uuid_staff =${id};`)
            return bringStaff
        } catch (error) {
            return false
        }
    }

    async postLogin (){
        try {
            const login = mcdowellConnection.query()
            return login;
        } catch (error) {
            return false;
        }
    }

    async postNewStaff(loginEmail, passw){
        try {
            const newUser = mcdowellConnection.query( `INSERT INTO staffs (values) VALUES()`); //incomplete
            return newUser
        } catch (error) {
            return false
        }
    }

    async patchStaff (){

    }
}

module.exports = staffManagers