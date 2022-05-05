class Menu {
    menu_num;
    menu_name;
    price;
    time_process;

    constructor(props){
        this.menu_num = props.menu_num;
        this.menu_name = props.menu_name;
        this.price = props.price;
        this.time_process = props.time_process;
    }
};

module.exports = Menu