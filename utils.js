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
connectRangeToNumeric(document.getElementById('espessura'), document.getElementById('espessura-number'));
connectRangeToNumeric(document.getElementById('comprimento'), document.getElementById('comprimento-number'));
connectRangeToNumeric(document.getElementById('largura'), document.getElementById('largura-number'));

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
    let z = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('height'));
    let y = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('border-bottom-width'));
    let E = parseInt(values['modulo']) * 1000000000;
    let Tx = parseInt(values['tensao-x']) * 1000000;
    let Ty = parseInt(values['tensao-y']) * 1000000;
    let Tz = parseInt(values['tensao-z']) * 1000000;
    let v = parseInt(values['coeficiente']);

    let deltaX = (x/E) * (Tx - v*(Ty + Tz));
    let deltaY = (y/E) * (Ty - v*(Tx + Tz));
    let deltaZ = (z/E) * (Tz - v*(Tx + Ty));

    resizableSquare.style.width = (x + deltaX) + 'px';
    textWidth.textContent = `${x+deltaX}mm`;

    resizableSquare.style.height = (z + deltaZ) + 'px';
    textHeight.textContent = `${z + deltaZ}mm`;

    resizableSquare.style.borderBottomWidth = (y + deltaY) + 'px';
    resizableSquare.style.borderRightWidth = (y + deltaY) + 'px';
    textMiddle.textContent = `${y + deltaY}mm`;

    // espessuraInput.value = y + deltaY;
    // espessuraInputNumber.value = y + deltaY;

    // comprimentoInput.value = x + deltaX;
    // larguraInput.value = z + deltaZ;

    // comprimentoInputNumber.value = x + deltaX;
    // larguraInputNumber.value = z + deltaZ;

    console.log(deltaX, deltaY, deltaZ);
}

const espessuraInput = document.getElementById('espessura');
const comprimentoInput = document.getElementById('comprimento');
const larguraInput = document.getElementById('largura');
const espessuraInputNumber = document.getElementById('espessura-number');
const comprimentoInputNumber = document.getElementById('comprimento-number');
const larguraInputNumber = document.getElementById('largura-number');

espessuraInput.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.borderBottomWidth = this.value + 'px';
    resizableSquare.style.borderRightWidth = this.value + 'px';
    textMiddle.textContent = `${this.value}mm`;
});

espessuraInputNumber.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.borderBottomWidth = this.value + 'px';
    resizableSquare.style.borderRightWidth = this.value + 'px';
    textMiddle.textContent = `${this.value}mm`;
});

comprimentoInput.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.width = this.value + 'px';
    textWidth.textContent = `${this.value}mm`;
});
comprimentoInputNumber.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.width = this.value + 'px';
    textWidth.textContent = `${this.value}mm`;
});

larguraInput.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.height = this.value + 'px';
    textHeight.textContent = `${this.value}mm`;
});
larguraInputNumber.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.height = this.value + 'px';
    textHeight.textContent = `${this.value}mm`;
});
