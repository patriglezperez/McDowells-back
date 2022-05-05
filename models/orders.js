class Orders {
    serial_order;
    order_day;
    uuid_user;
    uuid_menu;
    status;
    chef;
    waiter;
    order_notes;
    date_order;

    constructor(props){
        this.serial_order= props.serial_order;
        this.order_day= props.order_day;
        this.uuid_user= props.uuid_user;
        this.uuid_menu= props.uuid_menu;
        this.status= props.status;
        this.chef= props.chef;
        this.waiter= props.waiter;
        this.order_notes= props.order_notes;
        this.date_order= props.date_order;
    }
}

module.exports = Orders;


