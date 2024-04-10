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

    const { Circle, Polygon, Square } = require('./main/library/shapes');
    const questions = require('./main/library/questions');

    try {
        const data = await inquirer.prompt(questions);
        console.log("Creating svg file...");
        console.log('Data:', data); // Add this line to check the value of data.fill
        switch (data.shape) {
            case 'Square':
                console.log('Square is being Created...')
                const square = new Square(data.fill, data.stroke, data.strokeWidth, data.text, data.textColor, data.width, data.height)
                fs.writeFileSync("square.svg", square.renderSquare());
                console.log('Congratulations, square is now created!');
                break;
            case 'Circle':
                console.log('Circle is being created...')
                const circle = new Circle(data.fill, data.stroke, data.strokeWidth, data.text, data.textColor, data.radius)
                fs.writeFileSync("circle.svg", circle.renderCircle());
                console.log('Congratulations, a circle is now created!');
                break;
            case 'Triangle':
                console.log('Triangle is being created...')
                const triangle = new Polygon(data.fill, data.stroke, data.strokeWidth, data.text, data.textColor)
                fs.writeFileSync("triangle.svg", triangle.renderPolygon());
                console.log('Congratulations, triangle is now created!');
                break;
            default:
                console.log('Invalid shape selected');
        }
    } catch (err) {
        console.error(err);
    }
}

init();
