const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, imgSrc, officeNumber) {
        super(name, id, email, imgSrc);
        this.officeNumber = officeNumber;
        this.title = 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;
