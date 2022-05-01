import { getElpassedTime } from "./timer.js";
import { deckObj, createGameBoard } from "./decks.js";

const deckContainerElement = document.getElementById("deck-container");

const timer = setInterval(() => {
  getElpassedTime("#timer");
}, 1000);

// reload every new game
createGameBoard(deckContainerElement, "normal");
