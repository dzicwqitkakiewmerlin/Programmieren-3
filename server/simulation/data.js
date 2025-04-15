//collects data how many ever lived
export let deathGrass_data = 0;
export let Grass_data = 0;
export let GrassEater_data = 0;
export let GrassEaterPups_data = 0;
export let MeatEater_data = 0;
export let MobSpawner_data = 0;

export function incrementCounter(value) {
    if (value == "deathGrass") {
        deathGrass_data++;
    } else if (value == "Grass") {
        Grass_data++;
    } else if (value == "GrassEater") {
        GrassEater_data++;
    } else if (value == "GrassEaterPups") {
        GrassEaterPups_data++;
    } else if (value == "MeatEater") {
        MeatEater_data++;
    } else if (value == "MobSpawner") {
        MobSpawner_data++;
    }
}

export function getCounter() {
    let data = [
        deathGrass_data,
        Grass_data,
        GrassEater_data,
        GrassEaterPups_data,
        MeatEater_data,
        MobSpawner_data
    ]
return data;
}

export function resetData() {
    deathGrass_data = 0;
    Grass_data = 0;
    GrassEater_data = 0;
    GrassEaterPups_data = 0;
    MeatEater_data = 0;
    MobSpawner_data = 0;
}

//colects data how many live now
export let now_deathGrass = 0;
export let now_Grass = 0;
export let now_GrassEater = 0
export let now_GrassEasterPups = 0;
export let now_MeatEater = 0;
export let now_MobSpawner = 0;

export function actuallivingcreatures(creature, value){
    if(creature == "deathGrass"){
        now_deathGrass = value;
    }else if (creature == "Grass"){
        now_Grass = value;
    }else if(creature == "GrassEater"){
        now_GrassEater = value;
    }else if(creature == "GrassEaterPups"){
        now_GrassEasterPups = value;
    }else if(creature == "MeatEater"){
        now_MeatEater = value;
    }else if(creature == "MobSpawner"){
        now_MobSpawner = value;
    }
}
