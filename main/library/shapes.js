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
    setText() {
        return `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="60px" font-weight="700"
        fill="${this.textColor}">${this.text}</text>`;
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

    renderSquare() {
        return `<svg version="1.1"
        width="500" height="500"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${this.fillColor}" />
        <rect width="${this.width}" height="${this.height}" fill="none" stroke="${this.stroke}" stroke-width="${this.strokeWidth}" />
        ${super.setText()} <!-- Use the setText method from the Shapes class -->
        </svg>`;
    }  
}

class Polygon extends Shapes {
    constructor(fillColor, stroke, strokeWidth, text, textColor) {
        super(fillColor, stroke, strokeWidth, text, textColor);
    }

    // Method to render a triangle
    renderPolygon() {
        return `<svg version="1.1"
        width="500" height="500"
        xmlns="http://www.w3.org/2000/svg">
        <polygon points="250, 60 100, 400 400, 400" stroke="${this.stroke}" stroke-width="${this.strokeWidth}" fill="${this.fillColor}" />
        ${super.setText()} <!-- Use the setText method from the Shapes class -->
        </svg>`;
    }
}

class Circle extends Shapes {
    radius;

    constructor(fillColor, stroke, strokeWidth, text, textColor, radius) {
        super(fillColor, stroke, strokeWidth, text, textColor);
        this.radius = radius;
    }

    renderCircle() {
        return `<svg version="1.1"
        width="500" height="500"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250" r="${this.radius}" fill="${this.fillColor}" />
        <circle cx="250" cy="250" r="${this.radius}" fill="none" stroke="${this.stroke}" stroke-width="${this.strokeWidth}" />
        ${super.setText()} <!-- Use the setText method from the Shapes class -->
        </svg>`;
    }
}

module.exports = { Shapes, Circle, Polygon, Square };
