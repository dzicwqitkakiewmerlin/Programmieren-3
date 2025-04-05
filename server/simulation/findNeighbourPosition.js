export function findNeighbourPositions(x, y, distance, creatureType) {
    let positions = []
    //Alle Koordintaten ermitteln und in der Matrix positions speichern
    for (let i = x - distance; i <= x + distance; i++) {
        for (let j = y - distance; j <= y + distance; j++) {
            //nicht sich selber
            if (x == i && y == j) {

            }//nicht außerhalb des Canavas
            else if (i < 0 || j < 0) {

            }//nicht größer als Canavas
            else if (i >= matrix.length || j >= matrix.length) {

            }
            //Koordinaten in der Mattrix speichern
            else if (matrix[i][j] instanceof creatureType) {
                positions.push([i, j])
            }
        }
    }
    return positions
}
