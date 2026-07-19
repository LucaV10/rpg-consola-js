import { IniciarCombate } from './logica.js';
import { garrosh, jaina } from './Personajes.js';

const PersonajesDisponibles = [garrosh, jaina];

let jugador1 = {
    nombre : "Luca",
    personaje : PersonajesDisponibles[0]
}

let jugador2 = {
    nombre : "Random",
    personaje : PersonajesDisponibles[1]
}

IniciarCombate(jugador1, jugador2);