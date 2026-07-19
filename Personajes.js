// Personajes

class Personajes {
    #nombre
    #hp
    #hpActual
    #ataque
    constructor(nombre,hp,hpActual,ataque)
    {
        this.#nombre = nombre
        this.#hp = hp
        this.#hpActual = hpActual
        this.#ataque = ataque
    }

    get nombre() {
        return this.#nombre
    }

    get hpActual() {
        return this.#hpActual
    }

    atacar (objetivo) {
        if (objetivo instanceof Personajes) {
            objetivo.recibirDaño(this.#ataque)
        }
    }

    recibirDaño(cantidadDaño) {
        this.#hpActual -= cantidadDaño

        if (this.#hpActual < 0){
            this.#hpActual = 0;
        }

        console.log(`${this.#nombre} recibió ${cantidadDaño}. Vida restante: ${this.#hpActual}`);
    }

    estaVivo() {
        return this.#hpActual > 0;
    }
}

// Habilidades

class Habilidades {
    #nombre
    #dañoBase
    #costo
    constructor(nombre,dañoBase,costo)
    {
        this.#nombre = nombre
        this.#dañoBase = dañoBase
        this.#costo = costo
    }

    get nombre() {
        return this.#nombre
    }

    get dañoBase() {
        return this.#dañoBase
    }

    get costo() {
        return this.#costo
    }
}


// La idea es que los luchadores tengan armadura que sirva como una capa mas de vida pero tenga menos daño que los magos
class Luchadores extends Personajes {
    #defensa
    #energiaMax
    #energiaActual
    constructor(nombre,hp,hpActual,ataque, defensa, energiaMax, energiaActual)
    {
        super(nombre,hp,hpActual,ataque)
        this.#defensa = defensa
        this.#energiaMax = energiaMax
        this.#energiaActual = energiaActual
    }

    get defensa() {
        return this.#defensa
    }

    get energiaActual() {
        return this.#energiaActual
    }

    recibirDaño(cantidadDaño) {
        let dañoRecibido = cantidadDaño - this.#defensa;
        this.#defensa -= cantidadDaño;

        if (this.#defensa < 0) {
            this.#defensa = 0;
        }
        
        if (dañoRecibido < 0) {
            dañoRecibido = 0;
        }
        super.recibirDaño(dañoRecibido);
    }

    lanzarHabilidad(habilidad,objetivo) {
        if (this.#energiaActual >= habilidad.costo) {
            this.#energiaActual -= habilidad.costo
            objetivo.recibirDaño(habilidad.dañoBase)
        } else {
            console.log(`${this.nombre} no tiene suficiente energía para lanzar ${habilidad.nombre}.`);
        }
    }
}

class Magos extends Personajes {
    #manaMax
    #manaActual
    constructor(nombre,hp,hpActual,ataque,manaMax,manaActual)
    {
        super(nombre,hp,hpActual,ataque)
        this.#manaMax = manaMax
        this.#manaActual = manaActual
    }

    get manaActual() {
        return this.#manaActual
    }

        lanzarHabilidad(habilidad,objetivo) {
        if (this.#manaActual >= habilidad.costo) {
            this.#manaActual -= habilidad.costo
            objetivo.recibirDaño(habilidad.dañoBase)
        } else {
            console.log(`${this.nombre} no tiene suficiente maná para lanzar ${habilidad.nombre}.`);
        }
    }

}

// Instanciar Habilidades
const bolaDeFuego = new Habilidades(
    "Bola de Fuego", // nombre
    25,              // daño base
    20,              // costo
);

const golpeFurioso = new Habilidades(
    "Golpe Furioso", // nombre
    15,              // daño base
    10,              // costo
);

// Instancias de personajes

// Instanciar un Luchador
const garrosh = new Luchadores(
    "Garrosh",   // nombre
    120,         // hp max
    120,         // hp actual
    8,          // ataque base
    30,          // defensa (escudo inicial)
    50,          // energia max
    50           // energia actual
);

// Instanciar un Mago
const jaina = new Magos(
    "Jaina",     // nombre
    80,          // hp max
    80,          // hp actual
    15,           // ataque base
    100,         // mana max
    100          // mana actual
);

export {bolaDeFuego, golpeFurioso, garrosh, jaina, Luchadores, Magos};