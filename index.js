const sampEmpArr = ['John', 'Smith', 'clerk', '$10/hr']

//* returns object w/ following keys: firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents

//* Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(fourElementArray) {
    const empRecord = {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2],
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empRecord
}

const sampEmpRec = createEmployeeRecord(sampEmpArr)

//* Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrayOfEmpArrays) {
    const collection = []
    arrayOfEmpArrays.forEach(arr => {
        collection.push(createEmployeeRecord(arr))
    })
    return collection
}

//* timeStamp format: 'YYYY-MM-DD HHMM'
//* Add an Object with keys to the timeInEvents Array on the record Object:
    //* type: Set to "TimeIn"
    //* hour: Derived from the argument
    //* date: Derived from the argument
function createTimeInEvent(empObj, timeStamp) {
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(timeStamp.slice(11)),
        date: timeStamp.slice(0, 10)
    }
    empObj.timeInEvents.push(timeInObj)
    return empObj
}

console.log(createTimeInEvent(sampEmpRec))

//* timeStamp format: 'YYYY-MM-DD HHMM'
//* Add an Object with keys to the timeOutEvents Array on the record Object:
    //* type: Set to "TimeOut"
    //* hour: Derived from the argument
    //* date: Derived from the argument
function createTimeOutEvent(empObj, timeStamp) {
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(timeStamp.slice(11)),
        date: timeStamp.slice(0, 10)
    }
    empObj.timeOutEvents.push(timeOutObj)
    return empObj
}

//* timeStamp format: 'YYYY-MM-DD'
//* Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(empObj, timeStamp) {
    const timeInObj = empObj.timeInEvents.find(n => n.date === timeStamp)
    const timeOutObj = empObj.timeOutEvents.find(n => n.date === timeStamp)
    
    return (timeOutObj.hour - timeInObj.hour)/100
}

//* timeStamp format: 'YYYY-MM-DD'
//* Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
function wagesEarnedOnDate(empObj, timeStamp) {
    let payOwed = hoursWorkedOnDate(empObj, timeStamp)
    return payOwed * empObj.payPerHour
}

//* Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...
function allWagesFor(empObj) {
    let allDatesWorked = []
    empObj.timeInEvents.forEach(dayWorked => {
        allDatesWorked.push(dayWorked.date)
    })
    let total = 0
    for (const timeStamp of allDatesWorked) {
        total = total + wagesEarnedOnDate(empObj, timeStamp)
    }
    return total
}

//* Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(ArrOfEmpObj, firstName) {
    return ArrOfEmpObj.find(emp => firstName === emp.firstName)
}

//* Given an array of multiple employee objects, aggregate all the dates' wages and add them together
function calculatePayroll(ArrOfEmpObj) {
    let totalWages = 0
    ArrOfEmpObj.forEach(emp => {
        totalWages = totalWages + allWagesFor(emp)
    })
    return totalWages
}