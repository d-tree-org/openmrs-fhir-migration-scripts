const createTask = require("./resources/taskResource")
const performScreening = require("./screening")

module.exports = function createUserTasks(clientDetails){
            const tasks = [];
            //looping through clientDetails to get each client's information and populating Tasks with that information.
            Object.keys(clientDetails).forEach(patientid => {

                const details = clientDetails[patientid]

                const tbCovid = createTask("TB/COVID Screening", details.userId, details.userName, details.nextAppointment)

                const demographicUpdates = createTask("Demographic Updates", details.userId, details.userName, details.nextAppointment)

                const guardianUpdates = createTask("Guardian Updates", details.userId, details.userName, details.nextAppointment)

                const vitals = createTask("Vitals", details.userId, details.userName, details.nextAppointment)

                const womenHealth = createTask("Women's Health Screening", details.userId, details.userName, details.nextAppointment)

                const clinicalReg = createTask("Clinical Registration", details.userId, details.userName, details.nextAppointment)

                const nextAppointment = createTask("TB History, Regimen and Next Appointment", details.userId, details.userName, details.nextAppointment)

                //screening tasks by age and gender to get the correct next appointment tasks/questionnaires
                performScreening(details.gender, details.birthDate, tasks, guardianUpdates, vitals, womenHealth)

                const tasksArray = [demographicUpdates, guardianUpdates, tbCovid, clinicalReg, vitals, nextAppointment]

                const taskMethod = {
                    "method": "POST",
                    "url": "Task/"
                }

                tasksArray.forEach(element => {
                    tasks.push(
                        {
                            resource: element, "request": taskMethod
                        }
                    );

                });


            });
        
            return tasks

}