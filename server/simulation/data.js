 let deathGrass = 1;
export let Grass = 0;
export let GrassEater = 0;
export let GrassEaterPups = 0;
export let MeatEater = 0;
export let MobSpawner = 0;

export function incrementCounter(value) {
    if (value == "deathGrass") {
        deathGrass++;
    } else if (value == "Grass") {
        Grass++;
    } else if (value == "GrassEater") {
        GrassEater++;
    } else if (value == "GrassEaterPups") {
        GrassEaterPups++;
    } else if (value == "MeatEater") {
        MeatEater++;
    } else if (value == "MobSpawner") {
        MobSpawner++;
    }
}

export function getCounter() {
    let data = [
        deathGrass,
        Grass,
        GrassEater,
        GrassEaterPups,
        MeatEater,
        MobSpawner
    ]
return data;
}