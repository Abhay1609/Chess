"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const message_1 = require("./message");
class GameManager {
    constructor() {
        this.pendingUser = null;
        this.game = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // Stop the game here because the user left
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === message_1.INIT_GAME) {
                if (this.pendingUser) {
                    //start a game
                    console.log("JOin Game");
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.game.push(game);
                    this.pendingUser = null;
                }
                else {
                    console.log("Start Game");
                    this.pendingUser = socket;
                }
            }
            // if(message.type==="create"){
            //     this.pendingUser=socket;
            //     this.createGame();
            // }
            // if(message.type==="join"){
            //     this.joinGame(socket);
            // }
            if (message.type === message_1.MOVE) {
                const game = this.game.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
