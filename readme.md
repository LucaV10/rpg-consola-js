# ⚔️ RPG de Consola en JavaScript

Un juego de rol (RPG) por turnos jugable directamente desde la terminal. Desarrollado con **Node.js** y **JavaScript moderno (ES6)**, este proyecto aplica conceptos fundamentales de Programación Orientada a Objetos (POO) como clases, herencia y polimorfismo.

---

## 🌟 Características Principales

* **Combate por turnos:** Un sistema dinámico donde los jugadores se alternan para atacar o usar habilidades especiales.
* **Clases de Personajes:**
  * 🛡️ **Luchadores:** Poseen armadura que mitiga el daño inicial y utilizan energía para sus habilidades.
  * 🔮 **Magos:** Tienen una gran cantidad de maná para lanzar hechizos devastadores.
* **Gestión de Recursos:** El juego calcula en tiempo real la vida, armadura, energía y maná de cada jugador según la clase elegida.
* **Interactividad:** Menús intuitivos en la consola que permiten a los usuarios tomar decisiones estratégicas en cada turno.

---

## 🛠️ Estructura del Proyecto

El código está modularizado para mantener la escalabilidad y el orden:

* `index.js`: Es el punto de entrada principal del juego. Se encarga de inicializar a los jugadores y llamar al motor principal.
* `logica.js`: Contiene el motor de combate, el bucle de turnos y los menús interactivos de selección.
* `Personajes.js`: Almacena las plantillas (clases) de los personajes, las habilidades y la lógica de daño y defensa.

---

## 🚀 Requisitos Previos

Para poder jugar a este juego en tu computadora, necesitas tener instalado:
* [Node.js](https://nodejs.org/es/) (Versión 14 o superior recomendada).

---

```mermaid
classDiagram
    class Personajes {
        -nombre: string
        -hp: number
        -hpActual: number
        -ataque: number
        +atacar(objetivo)
        +recibirDaño(cantidadDaño)
        +estaVivo() boolean
    }

    class Luchadores {
        -defensa: number
        -energiaMax: number
        -energiaActual: number
        +recibirDaño(cantidadDaño)
        +lanzarHabilidad(habilidad, objetivo)
    }

    class Magos {
        -manaMax: number
        -manaActual: number
        +lanzarHabilidad(habilidad, objetivo)
    }

    class Habilidades {
        -nombre: string
        -dañoBase: number
        -costo: number
    }

%% Las flechas indican herencia (extends)
    Personajes <|-- Luchadores
    Personajes <|-- Magos

    %% Relación de asociación (usa)
    Luchadores --> Habilidades : usa
    Magos --> Habilidades : usa
    ```