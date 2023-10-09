function connectRangeToNumeric(rangeEl, numericEl) {
    // Set the initial value of the numeric input to the value of the range input
    numericEl.value = rangeEl.value;

    // Add an event listener to the range input that updates the numeric input value
    rangeEl.addEventListener('input', function() {
        numericEl.value = rangeEl.value;
    });

    // Add an event listener to the numeric input that updates the range input value
    numericEl.addEventListener('input', function() {
        rangeEl.value = numericEl.value;
    });
}

connectRangeToNumeric(document.getElementById('tensao-x'), document.getElementById('tensao-x-number'));
connectRangeToNumeric(document.getElementById('tensao-y'), document.getElementById('tensao-y-number'));
connectRangeToNumeric(document.getElementById('tensao-z'), document.getElementById('tensao-z-number'));
connectRangeToNumeric(document.getElementById('modulo'), document.getElementById('modulo-number'));
connectRangeToNumeric(document.getElementById('coeficiente'), document.getElementById('coeficiente-number'));

function getFormValues(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    const values = {};

    inputs.forEach(input => {
        values[input.id] = input.value;
    });

    console.log(values);

    let x = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('width'));
    let y = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('height'));
    let z = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('border-bottom-width'));
    let E = parseInt(values['modulo']);
    let Tx = parseInt(values['tensao-x']);
    let Ty = parseInt(values['tensao-y']);
    let Tz = parseInt(values['tensao-z']);
    let v = parseInt(values['coeficiente']);

    let deltaX = (x/E) * (Tx - v*(Ty + Tz));
    let deltaY = (y/E) * (Ty - v*(Tx + Tz));
    let deltaZ = (z/E) * (Tz - v*(Tx + Ty));

    resizableSquare.style.width = (x + deltaX) + 'px';
    textWidth.textContent = `${x+deltaX}mm`;

    resizableSquare.style.height = (x + deltaY) + 'px';
    textHeight.textContent = `${x+deltaY}mm`;

    resizableSquare.style.borderBottomWidth = (z + deltaZ) + 'px';
    resizableSquare.style.borderRightWidth = (z + deltaZ) + 'px';
    textMiddle.textContent = `${z+deltaZ}mm`;

    console.log(deltaX, deltaY, deltaZ);
}
