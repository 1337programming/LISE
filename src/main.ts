import './styles/main.scss';
import 'ts-helper';
import { MainGame } from './mock-game/MainGame';
let game: MainGame = new MainGame();

game.run();
