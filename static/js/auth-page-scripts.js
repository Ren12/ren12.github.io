function randomizePosition() {
    let staticBlock = document.querySelector('.auth__image');
    let dynamicPos = document.querySelector('.auth__notification');

    let staticBlockHeight = staticBlock.offsetHeight;
    let staticBlockWidth = staticBlock.offsetWidth;
    let dynamicPosHeight = dynamicPos.offsetHeight;
    let dynamicPosWidth = dynamicPos.offsetWidth;

    let maxLeft = staticBlockWidth - dynamicPosWidth - 15;
    let maxBottom = staticBlockHeight / 4;

    let newLeft = Math.random() * maxLeft;
    let newBottom = 15 + Math.random() * maxBottom;

    dynamicPos.style.left = newLeft + 'px';
    dynamicPos.style.bottom = newBottom + 'px';
}

randomizePosition();
