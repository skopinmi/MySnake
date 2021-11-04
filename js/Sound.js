class Sound {
    constructor() {  
        this.sound = new Audio();
        this.possibleSounuds = ['ate', 'step', 'win', 'lose'];
    }

    play(sound) {
        if(!this.possibleSounuds.includes(sound)) {
            throw new Error('Передан не верный звук. Вы передали: ' + sound);
        }
        if (sound === 'ate') {
            this.sound.src = 'sound/ate.wav';
        }
        this.sound.play();
    }
}