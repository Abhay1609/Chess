"use strict";
// interface Game{
//     id:number;
//     name:string;
//     player1:WebSocket;
//     player2:WebSocket;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
// }
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess;
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
        console.log("new Game");
    }
    makeMove(socket, move) {
        //validation here
        //Is it this users move
        //IS the move Valid
        if (this.moveCount % 2 === 0 && socket != this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket != this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        //await db.moves.push(move)
        // first move to network file system Redis #Recovery Mechanism as an intermediator
        //Scaling Project make different server but not have feature now to connect different server.INcrease and decerease the number of server
        //if new game created then choose the mini. load server and start the game make sure the both player on same server and spectator also in same server .
        //connecting the different server pubserve service to publish the service to different server not sharding use of pubsub it not become bottle neck as we have have limited number of server also have other approch use various hiererachy server 
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        //Update the board
        // Push the move
        //check if the game is over
        //send the output to user
        this.moveCount++;
    }
}
exports.Game = Game;
