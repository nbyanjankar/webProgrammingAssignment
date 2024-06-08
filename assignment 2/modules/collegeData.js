const fs = require('fs');

// Define the Data class
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

// Initialize dataCollection variable
let dataCollection = null;

// Function to initialize data
function initialize() {
    return new Promise((resolve, reject) => {
        // Read students.json file
        fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
            if (err) {
                // Reject if unable to read students.json
                reject("Unable to read students.json");
                return;
            }

            // Parse student data from file
            let studentData = JSON.parse(studentDataFromFile);

            // Read courses.json file
            fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
                if (err) {
                    // Reject if unable to read courses.json
                    reject("Unable to read courses.json");
                    return;
                }

                // Parse course data from file
                let courseData = JSON.parse(courseDataFromFile);

                // Create Data object with parsed data
                dataCollection = new Data(studentData, courseData);
                
                // Resolve the promise after initialization
                resolve();
            });
        });
    });
}

// Function to get all students
function getAllStudents() {
    return new Promise((resolve, reject) => {
        // Check if students data exists
        if (dataCollection.students.length > 0) {
            // Resolve with students data
            resolve(dataCollection.students);
        } else {
            // Reject if no students data
            reject("No results returned");
        }
    });
}

// Function to get all courses
function getCourses() {
    return new Promise((resolve, reject) => {
        // Check if courses data exists
        if (dataCollection.courses.length > 0) {
            // Resolve with courses data
            resolve(dataCollection.courses);
        } else {
            // Reject if no courses data
            reject("No results returned");
        }
    });
}

// Export functions for external use
module.exports = { initialize, getAllStudents, getCourses };
