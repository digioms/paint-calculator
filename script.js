document.getElementById('paintCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const doors = parseInt(document.getElementById('doors').value, 10);
    const windows = parseInt(document.getElementById('windows').value, 10);
    const includeCeiling = document.getElementById('ceiling').checked;
    const paintType = document.getElementById('paintType').value;

    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(doors) || isNaN(windows)) {
        document.getElementById('result').textContent = 'Please fill in all fields with valid numbers.';
        return;
    }

    const doorArea = doors * 20; // Average door area in square feet
    const windowArea = windows * 15; // Average window area in square feet
    const wallArea = 2 * (length + width) * height - doorArea - windowArea;
    const ceilingArea = includeCeiling ? length * width : 0;
    const totalArea = wallArea + ceilingArea;

    // Coverage per gallon varies by paint type
    const coveragePerGallon = {
        standard: 350,
        primer: 200,
        paintPrimer: 250,
        dark: 325,
        exterior: 400
    };

    const gallonsNeededOneCoat = totalArea / coveragePerGallon[paintType];
    const gallonsNeededTwoCoats = gallonsNeededOneCoat * 1.6;

    document.getElementById('one-coat').textContent = `One Coat: ${gallonsNeededOneCoat.toFixed(2)} gallon(s)`;
    document.getElementById('two-coat').textContent = `Two Coats: ${gallonsNeededTwoCoats.toFixed(2)} gallon(s)`;

    // Adjust iframe height dynamically
    function adjustParentIframe() {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );

        parent.postMessage(height, "*");
    }
    
    // Call function after the page loads & when resizing
    window.onload = adjustParentIframe;
    window.onresize = adjustParentIframe;
});
