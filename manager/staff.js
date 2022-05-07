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

    async postLogin(id){
        try {
            const login = mcdowellConnection.query(`UPDATE staffs SET statuss = "active" WHERE uuid_staff = ${id}`)
            return login;
        } catch (error) {
            return false;
        }
    }

    async postNewStaff(id, rol, name){
        try {
            const newUser = mcdowellConnection.query( `INSERT INTO staffs (uuid_staff, rol, name ) VALUES(${id}, ${rol}, ${name})`);
            return newUser
        } catch (error) {
            return false
        }
    }

    async decide(id){
        try {
            const check = mcdowellConnection.query(`Select * FROM staffs WHERE uuid_staff = ${id}`
            )
        } catch (error) {
            return false
        }
    }

    async patchStaff (){

    }
}

module.exports = staffManagers