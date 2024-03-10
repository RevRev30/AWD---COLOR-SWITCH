document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('button');
    const boxContainer = document.getElementById('box-container');
    const boxes = [];

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const buttonColor = getComputedStyle(button).backgroundColor;

            const newBox = createBox(buttonColor);
            moveAndRemovePreviousBox();

            boxes.push(newBox);
            dropNewBox();

            button.style.boxShadow = `0 0 20px ${buttonColor}`;
            button.style.color = 'white';

            resetButtonStyle(button);
        });

        button.addEventListener('mouseenter', function () {
            const buttonColor = getComputedStyle(button).backgroundColor;
            button.style.border = `2px solid ${buttonColor}`;
            button.style.transform = 'scale(1.1)'; 
            button.style.transition = 'transform 0.3s'; 
        });

        button.addEventListener('mouseleave', function () {
            button.style.border = 'none';
            button.style.transform = 'scale(1)'; 
        });
    });

    function createBox(color) {
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.style.top = '0';
        newBox.style.borderColor = color;
        newBox.style.backgroundColor = getLighterColor(color, 0.3);
        boxContainer.appendChild(newBox);
        return newBox;
    }

    function moveAndRemovePreviousBox() {
        if (boxes.length > 0) {
            const currentBox = boxes.shift();
            currentBox.style.top = '-150px';
            setTimeout(() => {
                if (boxContainer.contains(currentBox)) {
                    boxContainer.removeChild(currentBox);
                }
            }, 500);
        }
    }

    function dropNewBox() {
        const newBox = boxes[boxes.length - 1];
        setTimeout(() => {
            newBox.style.top = `calc(100% - ${newBox.offsetHeight}px)`;
            setTimeout(() => {
                newBox.style.backgroundColor = 'transparent';
            }, 300);
        }, 100);
    }

    function resetButtonStyle(button) {
        setTimeout(() => {
            button.style.color = '';
            button.style.boxShadow = 'none';
        }, 500);
    }

    function getLighterColor(color, opacity) {
        const rgbValues = color.match(/\d+/g);
        return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
    }
});
