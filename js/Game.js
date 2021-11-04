class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    /** 
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Food} food
     * @param {Sound} sound
     */
    init(settings, status, board, snake, menu, food, sound) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.sound = sound;
    }

    /**
     * Метод назначает обработчики на события клика на кнопки "Старт",
     * "Пауза", а также на стрелки на клавиатуре.
     */
    initGameControl() {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this), this.goUp.bind(this),
                                        this.goDown.bind(this), this.goLeft.bind(this), this.goRight.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    /**
     * Метод запускает игру.
     */
    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier);
        }
    }
    /**
     * методы движения в сторону по нажатию кнопки на экране
     */
    goUp() {
        this.snake.changeDirection('up');
    }

    goDown() {
        this.snake.changeDirection('down');
    }

    goLeft() {
        this.snake.changeDirection('left');
    }

    goRight() {
        this.snake.changeDirection('right');
    }

    /**
     * Этот метод запускается каждую секунду и осуществляет:
     * 1. перемещение змейки
     * 2. проверяет проиграна/выиграна ли игра
     * 3. увеличивает размер змейки если она ест еду
     * 4. заново отрисовывает положение змейки и еды
     */
    doTick() {
        this.snake.performStep();
        if (this.isGameLost()) {
            return;
        }
        if (this.isGameWon()) {
            return;
        }
        if (this.board.isHeadOnFood()) {
            this.sound.play('ate');
            this.snake.increaseBody();
            this.food.setNewFood();
            this.upperLevel();
        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
    }

    /**
     * Метод проверяет выиграна ли игра, останавливает игру,
     * выводит сообщение о выигрыше.
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы выиграли');
            return true;
        }
        return false;
    }

    /**
     * Метод проверяет проиграна ли игра, останавливает игру
     * в случае проигрыша, выводит сообщение о проигрыше.
     * @returns {boolean} если мы шагнули в стену, тогда
     * true, иначе false.
     */
    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет 
     * вызываться соответствующий метод.
     * @param {KeyboardEvent} event 
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.goUp();
                break;
            case "ArrowDown":
                this.goDown();
                break;
            case "ArrowLeft":
                this.goLeft();
                break;
            case "ArrowRight":
                this.goRight();
                break;
        }
    }
    

    /**
     * Метод выводит сообщение на странице.
     * @param {string} text 
     */
    setMessage(text) {
        this.messageEl.innerHTML = `<h1>${text}</h1>`;
    }

    /**
     * увеличивает сложность
     * пока только скорость
     */
    upperLevel() {
        this.settings.speed += 50;
    }
}