const resizableSquare = document.getElementById('square');
const textWidth = document.getElementById('text-width');
const textHeight = document.getElementById('text-height');
const textMiddle = document.getElementById('text-middle');
let isResizing = false;
let isResizingRightButton = false; 
let originalX, originalY, originalBorder, originalWidth, originalHeight;

resizableSquare.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.button === 2) {
        isResizingRightButton = true;
        originalY = e.clientY;
        originalBorder = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('border-bottom-width'));
    }
    isResizing = true;
    originalX = e.clientX;
    originalY = e.clientY;
    originalWidth = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('width'));
    originalHeight = parseInt(getComputedStyle(resizableSquare, null).getPropertyValue('height'));
});

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener('mousemove', (e) => {
    if (!isResizing && !isResizingRightButton) return;

    resizableSquare.style.transition = 'none';

    const deltaX = e.clientX - originalX;
    const deltaY = e.clientY - originalY;

    const newWidth = originalWidth + deltaX;
    const newHeight = originalHeight + deltaY;
    const newBorder = originalBorder + deltaY;

    if (isResizingRightButton) {
        if(newBorder < 10 || newBorder > 500) return;
        resizableSquare.style.borderBottomWidth = newBorder + 'px';
        resizableSquare.style.borderRightWidth = newBorder + 'px';
        textMiddle.textContent = `${newBorder}mm`;
        espessuraInput.value = newBorder;
        espessuraInputNumber.value = newBorder;
        return;
    }

    if(newWidth < 10 || newHeight < 10) return;
    resizableSquare.style.width = newWidth + 'px';
    resizableSquare.style.height = newHeight + 'px';
    
    textWidth.textContent = `${newWidth}mm`;
    textHeight.textContent = `${newHeight}mm`;

    comprimentoInput.value = newWidth;
    larguraInput.value = newHeight;
    comprimentoInputNumber.value = newWidth;
    larguraInputNumber.value = newHeight;
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    isResizingRightButton = false;
    resizableSquare.style.transition = 'all 0.5s';
});
