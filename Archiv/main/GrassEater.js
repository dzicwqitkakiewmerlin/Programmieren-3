class GrassEater extends LivingCreature {
    constructor() {
        super("yellow");
        this.live = 0
        this.eaten = 0
    }
    step() {
        this.move();

        if (this.live >= 10) {
            this.death()
        }
        if (this.eaten >= 5) {
            this.multiply(Grass, getRandomCreature2);
        } if (this.eaten >= 25) {
            matrix[this.row][this.col] = new MobSpawner();
        }
        this.live++;
    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 1, Grass)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours);
            updateCreaturePosition(this, randomNeighbour);
            this.eaten++;
        }
        let neighbours_e = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (neighbours_e.length > 0) {
            let randomNeighbour = random(neighbours_e);
            updateCreaturePosition(this, randomNeighbour);
            this.eaten += 2;
        }
    }
    death() {
        matrix[this.row][this.col] = new Empty();
    }

}