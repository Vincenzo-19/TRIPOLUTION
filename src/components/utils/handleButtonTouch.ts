// funzione per gestire il touch dei bottoni

export const addButtonTouchListeners = () => {
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('touchstart', () => {
            button.style.backgroundColor = '#95a6fb';
        });
        button.addEventListener('touchend', () => {
            button.style.backgroundColor = '#7686fb';
        });
    });
};
