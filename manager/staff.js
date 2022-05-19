const { Staff } = require ("../models/staff");
const mcdowellConnection = require("../database/connection");

class staffManager{
    async getStaff (){
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try {
            const bringStaff = await myConnection.query(`SELECT * FROM staffs`)
            return bringStaff
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

<<<<<<< HEAD
    async getStaffMember(id){
        console.log('llega la informacion',id)
=======
    async getStaffMember(id) {
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try {
            const bringStaff = await myConnection.query(`SELECT * FROM staffs WHERE uuid_staff ='${id}';`)
            return bringStaff
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    async postLogin(id){
        ///console.log('id_manager:', id)
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try {
<<<<<<< HEAD
            const login = await myConnection.query(`UPDATE staffs SET statuss = "active" WHERE uuid_staff = "${id}";`)
=======
            const login = await myConnection.query(`UPDATE staffs SET statuss = 'active' WHERE uuid_staff = '${id}';`)
            ///console.log('login:', login);
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return login;
        } catch (error) {
            ///console.log('error_managers:', error);
            return false;
        }finally{
            myConnection.end()
        }
    }

    async postNewStaff(id, rol, name){
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try {
            const newUser = await myConnection.query( `INSERT INTO staffs (uuid_staff, rol, name ) VALUES('${id}', '${rol}', '${name}')`);
            return newUser
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    async decide(id){
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try {
<<<<<<< HEAD
            const checked = await myConnection.query(`Select * FROM staffs WHERE uuid_staff = ${id};`);
=======
            const checked = await myConnection.query(`Select * FROM staffs WHERE uuid_staff = '${id}';`);
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return checked
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }

    async patchStatusMember(uuid_staff, statuss){
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try{
           const statusMember = await myConnection.query(`UPDATE staffs SET statuss = '${statuss}' WHERE uuid_staff = '${uuid_staff}';`);
           return statusMember;
       } catch (error) {
           return false
       } finally{
        myConnection.end()
        }
    }

    async updateStaff(uuid_staff, email, password, rol){
        const myConnection = mcdowellConnection()
        await myConnection.connect();
        try {
<<<<<<< HEAD
            const update = await myConnection.query(`UPDATE staffs SET uuid_staff = ${uuid_staff}, email= ${email}, password = ${password}, rol = ${rol} WHERE uuid_staff = ${uuid_staff};`);
=======
            const update = await myConnection.query(`UPDATE staffs SET uuid_staff = '${uuid_staff}', email= '${email}', password = '${password}', rol = '${rol}' WHERE uuid_staff = '${uuid_staff}';`);
>>>>>>> 22877db49f936eee3556a98ff1b3dc5f096dc6ac
            return update 
        } catch (error) {
            return false
        }finally{
            myConnection.end()
        }
    }
}

module.exports = staffManager