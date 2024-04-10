const questions = [
    {
        type: "list",
        name: "shape",
        message: "What shape do you want?",
        choices: ['Circle', 'Square', 'Triangle']
    },
    {
        type: "input",
        name: "text",
        message: "Text inside the shape? Enter up to 3 characters",
    },
    {
        type: "input",
        name: "textColor",
        message: "Please insert the text color",
    },
    {
        type: "input",
        name: "fill",
        message: "Please insert the background color",
    },
];

module.exports = questions;
