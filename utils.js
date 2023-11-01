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

const coeficiente = document.getElementById('coeficiente');
const coeficiente_number = document.getElementById('coeficiente-number');

const modulo = document.getElementById('modulo');
const modulo_number = document.getElementById('modulo-number');

connectRangeToNumeric(document.getElementById('tensao-x'), document.getElementById('tensao-x-number'));
connectRangeToNumeric(document.getElementById('tensao-y'), document.getElementById('tensao-y-number'));
connectRangeToNumeric(document.getElementById('tensao-z'), document.getElementById('tensao-z-number'));
connectRangeToNumeric(modulo, modulo_number);
connectRangeToNumeric(coeficiente, coeficiente_number);
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

    let x = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('width')) * 0.001;
    let z = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('height')) * 0.001;
    let y = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('border-bottom-width')) * 0.001;
    let E = parseInt(values['modulo']) * 1000000000;
    let Tx = parseInt(values['tensao-x']) * 1000000;
    let Ty = parseInt(values['tensao-y']) * 1000000;
    let Tz = parseInt(values['tensao-z']) * 1000000;
    let v = parseFloat(values['coeficiente']);

    let epsilonX = (Tx - v*(Ty + Tz))/E;
    let epsilonY = (Ty - v*(Tx + Tz))/E;
    let epsilonZ = (Tz - v*(Tx + Ty))/E;

    let deltaX = epsilonX * x;
    let deltaY = epsilonY * y;
    let deltaZ = epsilonZ * z;

    x = (deltaX + x)*1000;
    y = (deltaY + y)*1000; 
    z = (deltaZ + z)*1000;

    deltaX = deltaX*1000;
    deltaY = deltaY*1000;
    deltaZ = deltaZ*1000;

    const deltaXText = document.getElementById('deltaXText');
    const deltaYText = document.getElementById('deltaYText');
    const deltaZText = document.getElementById('deltaZText');

    deltaXText.textContent = 'Δx =' + deltaX.toFixed(5) + ' mm';
    deltaYText.textContent = 'Δy =' + deltaY.toFixed(5) + ' mm';
    deltaZText.textContent = 'Δz =' + deltaZ.toFixed(5) + ' mm';

    resizableSquare.style.width = x + 'px';
    textWidth.textContent = `${x.toFixed(2)}mm`;

    resizableSquare.style.height = z + 'px';
    textHeight.textContent = `${z.toFixed(2)}mm`;

    resizableSquare.style.borderBottomWidth = y + 'px';
    resizableSquare.style.borderRightWidth = y + 'px';
    textMiddle.textContent = `${y.toFixed(2)}mm`;

    vf.textContent = 'Vf = ' + ((x)*(z)*(y)*0.001).toFixed(2) + 'cm³';
}

const espessuraInput = document.getElementById('espessura');
const comprimentoInput = document.getElementById('comprimento');
const larguraInput = document.getElementById('largura');
const espessuraInputNumber = document.getElementById('espessura-number');
const comprimentoInputNumber = document.getElementById('comprimento-number');
const larguraInputNumber = document.getElementById('largura-number');

//const vi = document.getElementById('vi');

const select = document.getElementById('select-material');

espessuraInput.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.borderBottomWidth = this.value + 'px';
    resizableSquare.style.borderRightWidth = this.value + 'px';
    textMiddle.textContent = `${this.value}mm`;

    vi.textContent = `Vi = ${(comprimentoInput.value * larguraInput.value * espessuraInput.value * 0.001).toFixed(2)}cm³`;
});

espessuraInputNumber.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.borderBottomWidth = this.value + 'px';
    resizableSquare.style.borderRightWidth = this.value + 'px';
    textMiddle.textContent = `${this.value}mm`;

    vi.textContent = `Vi = ${(comprimentoInput.value * larguraInput.value * espessuraInput.value * 0.001).toFixed(2)}cm³`;
});

comprimentoInput.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.width = this.value + 'px';
    textWidth.textContent = `${this.value}mm`;

    vi.textContent = `Vi = ${(comprimentoInput.value * larguraInput.value * espessuraInput.value * 0.001).toFixed(2)}cm³`;
});

comprimentoInputNumber.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.width = this.value + 'px';
    textWidth.textContent = `${this.value}mm`;

    vi.textContent = `Vi = ${(comprimentoInput.value * larguraInput.value * espessuraInput.value * 0.001).toFixed(2)}cm³`;
});

larguraInput.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.height = this.value + 'px';
    textHeight.textContent = `${this.value}mm`;

    vi.textContent = `Vi = ${(comprimentoInput.value * larguraInput.value * espessuraInput.value * 0.001).toFixed(2)}cm³`;
});

larguraInputNumber.addEventListener('input', function() {
    resizableSquare.style.transition = 'none';
    resizableSquare.style.height = this.value + 'px';
    textHeight.textContent = `${this.value}mm`;

    vi.textContent = `Vi = ${(comprimentoInput.value * larguraInput.value * espessuraInput.value * 0.001).toFixed(2)}cm³`;
});

select.addEventListener('change', function() {
    const material = this.value;
    if(material == 'none'){
        coeficiente.disabled = coeficiente_number.disabled = false;
        modulo.disabled = modulo_number.disabled = false;

        resizableSquare.style.backgroundColor = 'purple';

        return;
    }

    coeficiente.disabled = coeficiente_number.disabled = true;
    modulo.disabled = modulo_number.disabled = true;

    if(material == 'al'){
        coeficiente.value = 0.33;
        coeficiente_number.value = 0.33;
        modulo.value = 70;
        modulo_number.value = 70;

        resizableSquare.style.backgroundColor = '#c0c0c0 ';
    }

    if(material == 'aco'){
        coeficiente.value = 0.27;
        coeficiente_number.value = 0.27;
        modulo.value = 205;
        modulo_number.value = 205;

        resizableSquare.style.backgroundColor = '#696969 ';
    }

    if(material == 'cu'){
        coeficiente.value = 0.34;
        coeficiente_number.value = 0.34;
        modulo.value = 110;
        modulo_number.value = 110;

        resizableSquare.style.backgroundColor = '#b87333';
    }

    if(material == 'latao'){
        coeficiente.value = 0.32;
        coeficiente_number.value = 0.32;
        modulo.value = 100;
        modulo_number.value = 100;

        resizableSquare.style.backgroundColor = '#daa520';
    }

});
