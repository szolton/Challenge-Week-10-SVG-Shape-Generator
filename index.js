const fs = require('fs');

const init = async () => {
    let inquirer;
    try {
        // Attempt to import inquirer using dynamic import
        const { default: inquirerModule } = await import('inquirer');
        inquirer = inquirerModule;
    } catch (err) {
        // Handle error if dynamic import is not supported
        if (err.code === 'ERR_REQUIRE_ESM') {
            // Fallback to requiring the ESM module directly
            const inquirerModule = require('inquirer/esm');
            inquirer = inquirerModule.default;
        } else {
            throw err;
        }
    }

    // Require the shape classes and questions
    const { Circle, Polygon, Square } = require('./main/library/shapes');
    const questions = require('./main/library/questions');

    try {
        // Prompt the user with questions
        const data = await inquirer.prompt(questions);

        // Based on the selected shape, create the corresponding object and write the SVG file
        switch (data.shape) {
            // If the selected shape is a square
            case 'Square':
                // Create a new Square object with the provided data
                const square = new Square(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, data.width, data.height);
                // Write the SVG representation of the square to a file
                fs.writeFileSync("logo.svg", square.renderSquare());
                console.log('Congratulations, a generated square logo.svg is now created!');
                break;

            // If the selected shape is a circle
            case 'Circle':
                // Create a new Circle with the provided data
                const circle = new Circle(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, data.radius);
                // Write the SVG representation of the circle to a file
                fs.writeFileSync("logo.svg", circle.renderCircle());
                console.log('Congratulations, a generated circle logo.svg is now created!');
                break;

            // If the selected shape is a triangle
            case 'Triangle':
                // Create a new Triangle object with the provided data
                const triangle = new Polygon(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor);
                // Write the SVG representation of the triangle to a file
                fs.writeFileSync("logo.svg", triangle.renderTriangle());
                console.log('Congratulations, generated triangle logo.svg is now created!');
                break;

            // If the selected shape is not recognized
            default:
                console.log('Invalid shape selected');
        }

    } catch (err) {
        console.error(err);
    }
}

init();
