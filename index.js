// Your code here
// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a time in event
function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Function to create a time out event
function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100; // Convert to hours
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}