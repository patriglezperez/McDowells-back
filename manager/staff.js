import {Staff} from '../models/staff.js';
import { sequelize } from "../database/database.js";

class staffManagers{
    static async getStaff (){
        try {
            const bringStaff = Staff.findAll()
        } catch (error) {
            throw(error)
        }
        return new Staff 
    }

    static async getStaffMemeber (body){
        console.log(body)
        try {
            const bringStaffMember = Staff.findAll({
                where: {
                    uuid_staff: `${body.uuid_staff}`
                }}
            )
        } catch (error) {
            
        }

    }

    static async postLogin (){

    }

    static async postNewStaff(){

    }

    static async putStaff (){

    }
}

export default staffManagers