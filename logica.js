// Logica principal del juego
import readlineSync from 'readline-sync';
import { bolaDeFuego, golpeFurioso, Luchadores, Magos } from './Personajes.js';

const HabilidadesDisponibles = [bolaDeFuego, golpeFurioso];

function eleccionHabilidad(jugador) {
    HabilidadesDisponibles.forEach((habilidad, index) => {
            console.log(`${index + 1}. ${habilidad.nombre} (Daño: ${habilidad.dañoBase}, Costo: ${habilidad.costo})`);
    });
    let eleccion = readlineSync.questionInt('Elige una habilidad: ') - 1; // el -1 es para ajustar el índice a 0-based
    if (eleccion >= HabilidadesDisponibles.length || typeof eleccion !== 'number' || eleccion < 0) {
        console.log('Elección inválida. Se seleccionará la primera habilidad por defecto.');
        return HabilidadesDisponibles[0];
    } else {
        return HabilidadesDisponibles[eleccion];
    }
}

function EleccionAtaque(jugador) {
    console.log(`Opciones de ataque para ${jugador.nombre}:`);
    let decision = readlineSync.question('¿Deseas atacar con una habilidad (1) o con una ataque básico (2)? Ingresa 1 o 2: ');
    if (decision === '1') {
        return {tipo: 'habilidad'};
    } else {
        return {tipo: 'basico'};
    }
}

function IniciarCombate(jugador1, jugador2) {
    console.log(`¡Comienza el combate entre ${jugador1.nombre} y ${jugador2.nombre}!`)
    let turno = 1
    let i = 0
    while (jugador1.personaje.estaVivo() && jugador2.personaje.estaVivo()) {
        console.log(`Turno ${turno}:`)
        console.log(`Vida de ${jugador1.nombre}: ${jugador1.personaje.hpActual}`);
        if (jugador1.personaje instanceof Luchadores) {
            console.log(`Armadura de ${jugador1.nombre}: ${jugador1.personaje.defensa}`);
            console.log(`Energía de ${jugador1.nombre}: ${jugador1.personaje.energiaActual}`);
        } else if (jugador1.personaje instanceof Magos) {
            console.log(`Mana de ${jugador1.nombre}: ${jugador1.personaje.manaActual}`);
        }
        console.log('-----------------------------------');
        console.log(`Vida de ${jugador2.nombre}: ${jugador2.personaje.hpActual}`);
        if (jugador2.personaje instanceof Luchadores) {
            console.log(`Armadura de ${jugador2.nombre}: ${jugador2.personaje.defensa}`);
            console.log(`Energía de ${jugador2.nombre}: ${jugador2.personaje.energiaActual}`);
        } else if (jugador2.personaje instanceof Magos) {
            console.log(`Mana de ${jugador2.nombre}: ${jugador2.personaje.manaActual}`);
        }
        if (i % 2 == 0) {
            console.log(`Turno del jugador ${jugador1.nombre}`)
            if (EleccionAtaque(jugador1).tipo === 'basico') {
                jugador1.personaje.atacar(jugador2.personaje)
            } else {
                let habilidadElegida = eleccionHabilidad(jugador1);
                jugador1.personaje.lanzarHabilidad(habilidadElegida, jugador2.personaje);
            }
        } else {
            console.log(`Turno del jugador ${jugador2.nombre}`)
            if (EleccionAtaque(jugador2).tipo === 'basico') {
                jugador2.personaje.atacar(jugador1.personaje)
            } else {
                let habilidadElegida = eleccionHabilidad(jugador2);
                jugador2.personaje.lanzarHabilidad(habilidadElegida, jugador1.personaje);
            }
        }
        turno++;
        i++;

        readlineSync.question('\nPresiona [Enter] para continuar al siguiente turno...');
        console.clear();
    }
    if (jugador1.personaje.estaVivo()) {
        console.log(`${jugador1.nombre} ha ganado el combate!`)
    } else {
        console.log(`${jugador2.nombre} ha ganado el combate!`)
    }

}

export {IniciarCombate}