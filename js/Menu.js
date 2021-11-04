class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
        this.upBntEl = document.getElementById('upBtn');
        this.downBntEl = document.getElementById('downBtn');
        this.leftBntEl = document.getElementById('leftBtn');
        this.rightBntEl = document.getElementById('rightBtn'); 
    }

    /**
     * Метод назначает переданные функции в качестве обработчиков
     * событий клика на кнопки "Старт" и "Пауза", 
     * "Влево", "Вправо" и тд. 
     * @param {*} startBtnClickHandler 
     * @param {*} pauseBtnClickHandler 
     * @param {*} upBtnClickHandler 
     * @param {*} downBtnClickHandler 
     * @param {*} leftBtnClickHandler 
     * @param {*} rightBtnClickHandler 
     */

    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler, upBtnClickHandler, 
                            downBtnClickHandler, leftBtnClickHandler, rightBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
        this.upBntEl.addEventListener('click', upBtnClickHandler);
        this.downBntEl.addEventListener('click', downBtnClickHandler);
        this.leftBntEl.addEventListener('click', leftBtnClickHandler);
        this.rightBntEl.addEventListener('click', rightBtnClickHandler);
    }
}