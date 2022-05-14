const { Staff } = require ("../models/staff");
const { mcdowellConnection } = require("../database/connection");

class staffManagers{
    async getStaff (){
        try {
            const bringStaff = mcdowellConnection.query(`SELECT * FROM staffs`)
            return bringStaff
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    async getStaffMemeber (id){
        try {
            const bringStaff = mcdowellConnection.query(`SELECT * FROM staffs WHERE uuid_staff =${id};`)
            return bringStaff
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    async postLogin(id){
        try {
            const login = mcdowellConnection.query(`UPDATE staffs SET statuss = "active" WHERE uuid_staff = ${id}`)
            return login;
        } catch (error) {
            return false;
        }finally{
            mcdowellConnection.end()
        }
    }

    async postNewStaff(id, rol, name){
        try {
            const newUser = mcdowellConnection.query( `INSERT INTO staffs (uuid_staff, rol, name ) VALUES(${id}, ${rol}, ${name})`);
            return newUser
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    async decide(id){
        try {
            const checked = mcdowellConnection.query(`Select * FROM staffs WHERE uuid_staff = ${id};`);
            return checked
        } catch (error) {
            return false
        }finally{
            mcdowellConnection.end()
        }
    }

    async patchStatusMember(uuid_staff, statuss){
       try {
           const statusMember = mcdowellConnection.query(`UPDATE staffs SET statuss = ${statuss} WHERE uuid_staff = ${uuid_staff};`);
           return statusMember;
       } catch (error) {
           return false
       } finally{
        mcdowellConnection.end()
        }
    }

    async updateStaff(uuid_staff, email, password, rol){
        try {
            const update = mcdowellConnection.query(`UPDATE staffs SET uuid_staff = ${uuid_staff}, email= ${email}, password = ${password}, rol = ${rol} WHERE uuid_staff = ${uuid_staff};`);
            return update 
        } catch (error) {
            
        }
    }
}

module.exports = staffManagers