import {Staff} from './staff.js';
import {Menu} from './menu.js';
import {Orders} from './orders.js';

Staff.hasMany(Orders, {
    foreignKey: 'chef',
    sourceKey: "chef"
})

Staff.hasMany(Orders, {
    foreignKey: "waiter",
    sourceKey: "waiter",
})

Orders.belongsTo(Staff, {foreignKey: "chef", targetKey: 'chef'})

Orders.belongsTo(Staff, {foreignKey: "waiter", targetKey: 'waiter'})


Menu.hasMany(Orders, {
    foreignKey: 'menu_num',
    sourceKey: "menu_num"
})

Orders.belongsTo(Menu, {foreignKey: "menu_num", targetKey: 'menu_num'})


export default {Staff, Menu, Orders}