//  Defines the class shape options
class Shapes {
    fillColor;
    stroke;
    strokeWidth;
    text;
    textColor;

    constructor(fillColor, stroke, strokeWidth, text, textColor) {
        this.fillColor = fillColor;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.text = text;
        this.textColor = textColor;
    }

    // Method to set the text inside the shape
    get textElement() {
        return `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="60px" font-weight="700"
        fill="${this.textColor}">${this.text}</text>`;
    }

    // Abstract method to be implemented by subclasses
    renderShape() {
        throw new Error('renderShape() must be implemented by subclasses');
    }
}

class Square extends Shapes {
    width;
    height;

    constructor(fillColor, stroke, strokeWidth, text, textColor, width, height) {
        super(fillColor, stroke, strokeWidth, text, textColor);
        this.width = width;
        this.height = height;
    }

    renderShape(width = 300, height = 300) {
        return `<svg version="1.1"
        width="${width}" height="${height}"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="${this.width}" height="${this.height}" fill="${this.fillColor}" />
        ${this.textElement} <!-- Use the textElement property from the Shapes class -->
        </svg>`;
    }
}

class Triangle extends Shapes {
    points;

    constructor(fillColor, stroke, strokeWidth, text, textColor, points) {
        super(fillColor, stroke, strokeWidth, text, textColor);
        this.points = points;
    }

    renderShape(width = 500, height = 500) {
        // Find the centroid of the triangle
        const [x1, y1, x2, y2, x3, y3] = this.points;
        const cx = (x1 + x2 + x3) / 3;
        const cy = (y1 + y2 + y3) / 3;

        return `<svg version="1.1"
        width="${width}" height="${height}"
        xmlns="http://www.w3.org/2000/svg">
        <polygon points="${this.points}" stroke="${this.stroke}" stroke-width="${this.strokeWidth}" fill="${this.fillColor}" />
        <text x="${cx}" y="${cy}" dominant-baseline="middle" text-anchor="middle" font-size="60px" font-weight="700"
        fill="${this.textColor}">${this.text}</text>
        </svg>`;
    }
}

class Circle extends Shapes {
    radius;

    constructor(fillColor, stroke, strokeWidth, text, textColor, radius) {
        super(fillColor, stroke, strokeWidth, text, textColor);
        this.radius = radius;
    }

    renderShape(width = 500, height = 500) {
        return `<svg version="1.1"
        width="${width}" height="${height}"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250" r="${this.radius}" fill="${this.fillColor}" stroke="${this.stroke}" stroke-width="${this.strokeWidth}" />
        ${this.textElement} <!-- Use the textElement property from the Shapes class -->
        </svg>`;
    }
}

module.exports = { Shapes, Circle, Triangle, Square };

