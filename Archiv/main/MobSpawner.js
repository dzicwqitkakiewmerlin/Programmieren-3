class MobSpawner {
    constructor() {
        this.color = "grey"
        this.stepCount = frameCount + 1
        this.counter = 0
        this.blockSize = 5
    }
    step() {
        this.counter++;

        if (this.counter >= 25) {
            this.spawn()
            this.counter = 0
        }

    }
    spawn() {
        matrix[this.row][this.col] = new getRandomCreature1()

    }
}