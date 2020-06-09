const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty array to hold objects created via user input
const employees = [];

const ManagerQuestions = [
      { 
        type: "input",
        name: "name",
        message: "What is your manager's name?"
      },
      { 
        type: "input",
        name: "id",
        message: "What is your manager's id?"
      },
      { 
        type: "input",
        name: "email",
        message: "What is your manager's email?"
      },
      { 
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?"
      },
      { 
        type: "checkbox",
        name: "type",
        message: "What type of team member would you like to add?",
        choices: [
          "Engineer", 
          "Intern", 
          "I don't want to add any more team members"
        ]
      },
];

const EngineerQuestions = [
  { 
    type: "input",
    name: "name",
    message: "What is your engineer's name?"
  },
  { 
    type: "input",
    name: "id",
    message: "What is your engineer's id?"
  },
  { 
    type: "input",
    name: "email",
    message: "What is your engineer's email?"
  },
  { 
    type: "input",
    name: "github",
    message: "What is your engineer's Github username?"
  },
  { 
    type: "checkbox",
    name: "type",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer", 
      "Intern", 
      "I don't want to add any more team members"
    ]
  },
];

const InternQuestions = [
  { 
    type: "input",
    name: "name",
    message: "What is your intern's name?"
  },
  { 
    type: "input",
    name: "id",
    message: "What is your intern's id?"
  },
  { 
    type: "input",
    name: "email",
    message: "What is your intern's email?"
  },
  { 
    type: "input",
    name: "school",
    message: "What is your intern's school?"
  },
  { 
    type: "checkbox",
    name: "type",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer", 
      "Intern", 
      "I don't want to add any more team members"
    ]
  },
];

// This function calls ManagerQuestions to begin with. render function called and write the html output to team.html file under output folder.
function init() {
 inquirer.prompt(ManagerQuestions)
 .then(data => {
   const memberType = (data.type);
   const managerData = new Manager(data.name, data.id, data.email, data.officeNumber);
   employees.push(managerData);
   if(memberType == "Engineer"){
     engineer();
   } else if (memberType == "Intern"){
     intern();
   } else if (memberType == "I don't want to add any more team members") {
    const teamHTML = render(employees);  
    fs.writeFile(outputPath,teamHTML, err => {
      if(err) {
        throw err;
      }
    });
    return;
   }
 })
 .catch(error => {
     throw error; 
 });
}

// This function gets called if selected team is equal to "Engineer". render function called and write the html output to team.html file under output folder.
function engineer() {
  inquirer.prompt(EngineerQuestions)
  .then(data => {
    const memberType = (data.type);
    const engineerData = new Engineer(data.name, data.id, data.email,data.github);
    employees.push(engineerData);
    if(memberType == "Engineer"){
      engineer();
    } else if(memberType == "Intern"){
      intern();
    } else if (memberType == "I don't want to add any more team members"){
      const teamHTML = render(employees);  
      fs.writeFile(outputPath,teamHTML, err => {
        if(err) {
          throw err;
        }
      });
      return;
    } 
  })
  .catch(error => {
      throw error; 
  });
}

// This function gets called if selected team is equal to "Intern". render function called and write the html output to team.html file under output folder.
function intern() {
  inquirer.prompt(InternQuestions)
  .then(data => {
     const memberType = (data.type);
     const internData = new Intern(data.name, data.id, data.email, data.school);
     employees.push(internData);
     if(memberType == "Engineer"){
      engineer();
    } else if(memberType == "Intern"){
      intern();
    } else if (memberType == "I don't want to add any more team members"){
      const teamHTML = render(employees);  
      fs.writeFile(outputPath,teamHTML, err => {
        if(err) {
          throw err;
        }
      });
      return;
    } 
  })
  .catch(error => {
      throw error; 
  });
}

init();
