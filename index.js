const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const outputPath = path.join(DIST_DIR, 'teamProfile.html');
//requires of files
const Manager = require('./lib/Manager');//manager
const Engineer = require('./lib/Engineer');//engineer
const Intern = require('./lib/Intern');//intern
//const Employee = require('./lib/Employee');
// template html require code
const templateHTML = require('./src/templateHTML');
// team members Info array
const teamInfo = [];
//add team member information function
function addTeamMemberInfo() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'team_member',
                message: 'Would you like to add more members? or you can finish the assemble',
                choices: ['Engineer', 'Intern', 'Assemble Team!'],
            },
        ])
        //after select the option, function going to next step in here
        .then((val) => {
            if (val.team_member === 'Engineer') {
                addEngineerInfo();
            } else if (val.team_member === 'Intern') {
                addInternInfo();
            } else {
                createTeamFile();
            }
        });
}

// add manager information function
function addManagerInfo() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'team manager name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'the team managers Employee ID?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'the team manager Email address?',
            },

            {
                type: 'input',
                name: 'officeNumber',
                message: 'office number of the manager?',
            },
        ])
        //next step after input has been entered
        .then((val) => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
            console.table(manager);
            teamInfo.push(manager);
            addTeamMemberInfo();
        });
}
//add engindeer information funcktion
function addEngineerInfo() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `engineers's name`,
            },
            {
                type: 'input',
                name: 'id',
                message: `engineer's employee ID?`,
            },
            {
                type: 'input',
                name: 'email',
                message: ` engineer's email address?`,
            },

            {
                type: 'input',
                name: 'gitHub',
                message: `engineer's github profile name?`,
            },
        ])
        // after enter the input, next step
        .then((val) => {
            const engineer = new Engineer(val.name, val.id, val.email, val.gitHub);
            console.table(engineer);
            teamInfo.push(engineer);
            addTeamMemberInfo();
        });
}
//add intern information function
function addInternInfo() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `Intern's name`,
            },
            {
                type: 'input',
                name: 'id',
                message: `Intern's employee ID?`,
            },
            {
                type: 'input',
                name: 'email',
                message: `Intern's email address?`,
            },

            {
                type: 'input',
                name: 'school',
                message: `School?`,
            },
        ])// then pusht the info in the file
        .then((val) => {
            const intern = new Intern(val.name, val.id, val.email, val.school);
            console.table(intern);
            teamInfo.push(intern);
            addTeamMemberInfo();
        });
}

//creating the file of team
function createTeamFile() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    } else {
        fs.writeFileSync(outputPath, templateHTML(teamInfo), 'utf-8');
        console.log('The file has been created');
    }
}
// function starting point
function starting() {
    addManagerInfo();
}
starting();
