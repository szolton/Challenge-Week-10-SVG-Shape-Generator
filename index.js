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
            console.error('Dynamic import is not supported. Please check your environment setup.');
            return;
        } else {
            throw err;
        }
    }

    // Require the shape classes and questions
    const { Square, Circle, Triangle } = require('./main/library/shapes');

    const questions = require('./main/library/questions');

    try {
        // Prompt the user with questions
        const data = await inquirer.prompt(questions);

        let shape;
        switch (data.shape) {
            case 'Square':
                shape = new Square(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, data.width, data.height);
                break;
            case 'Circle':
                shape = new Circle(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, data.radius);
                break;
            case 'Triangle':
                // Example points array for a triangle with vertices at (100,100), (200,200), and (300,100)
                const points = [100, 100, 200, 200, 300, 100];
                shape = new Triangle(data.fillColor, data.stroke, data.strokeWidth, data.text, data.textColor, points);
                break;
            default:
                console.log('Invalid shape selected');
                return;
        }

        fs.writeFileSync("logo.svg", shape.renderShape());
        console.log(`Congratulations, a generated ${data.shape.toLowerCase()} logo.svg is now created!`);

    } catch (err) {
        console.error(err);
    }
}

init();