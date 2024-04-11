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
            // Use dynamic import with CommonJS fallback
            const { default: inquirerModule } = await import('inquirer/esm')(module);
            inquirer = inquirerModule;
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
        console.log("Creating svg file...");
        console.log('Data:', data); // Add this line to check the value of data.fill
        console.log('FillColor:', data.fillColor);

        // Based on the selected shape, create the corresponding object and write the SVG file
        switch (data.shape) {
            // If the selected shape is a square
            case 'Square':
                console.log('Square is being Created...')
                // Create a new Square object with the provided data
                const square = new Square(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, data.width, data.height)
                // Write the SVG rep of the square to a file
                fs.writeFileSync("square.svg", square.renderSquare());
                console.log('Congratulations, square is now created!');
                break;

                // If the selected shape is a circle
            case 'Circle':
                console.log('Circle is being created...')
                // Create a new Circle with the provided data
                const circle = new Circle(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, data.radius)
                // Write the SVG rep of the circle to a file
                fs.writeFileSync("circle.svg", circle.renderCircle());
                console.log('Congratulations, a circle is now created!');
                break;

                // if the selected shape is a triangle
            case 'Triangle':
                console.log('Triangle is being created...')
                // Create a new Triangle object witht he provided data
                const triangle = new Polygon(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor)
                // Write the SVG rep of the triangle to a file
                fs.writeFileSync("triangle.svg", triangle.renderPolygon());
                console.log('Congratulations, triangle is now created!');
                break;

                // if the selected shape is not recognized
            default:
                console.log('Invalid shape selected');
        }
    } catch (err) {
        console.error(err);
    }
}

init();
