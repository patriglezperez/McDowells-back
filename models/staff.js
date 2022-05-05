class Staff {
    uuid_staff;
    email;
    password;
    role;
    status;
    
    constructor(props){
        this.uuid_staff = props.uuid_staff;
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
        this.status = props.status;
    }
};

module.exports = Staff