window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const menu = new Menu();
    const food = new Food();
    const game = new Game();
    const sound = new Sound();
    
    settings.init({ speed: 5, winLength: 5 });
    board.init(settings, snake);
    food.init(settings, snake, board);
    game.init(settings, status, board, snake, menu, food, sound);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();
    game.initGameControl();
});