// interface Game{
//     id:number;
//     name:string;
//     player1:WebSocket;
//     player2:WebSocket;

// }
import { Chess } from 'chess.js'
import { WebSocket } from 'ws';
import { MOVE, GAME_OVER, INIT_GAME } from './message';
export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    // private board:string;
    // private moves:string[];
    public board:Chess
    private startTime:Date;
    private moveCount=0;
    constructor (player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.board=new Chess;
       
        this.startTime=new Date();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
        console.log("new Game")


    }
    makeMove(socket:WebSocket,move:{
        from:string,
        to:string
    }){
        //validation here
        //Is it this users move
        //IS the move Valid
        if (this.moveCount %2===0&&socket!=this.player1){
            return;

        }

        if(this.moveCount%2===1&&socket!=this.player2){
            return;
            
        }
        try{
            this.board.move(move);
            



             }catch(e){
                console.log(e)
                return ;

        }
        //await db.moves.push(move)
        // first move to network file system Redis #Recovery Mechanism as an intermediator
        //Scaling Project make different server but not have feature now to connect different server.INcrease and decerease the number of server
        //if new game created then choose the mini. load server and start the game make sure the both player on same server and spectator also in same server .
        //connecting the different server pubserve service to publish the service to different server not sharding use of pubsub it not become bottle neck as we have have limited number of server also have other approch use various hiererachy server 
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"?"black":"white"
                }

            }))
            return;
        }
       
        if(this.moveCount%2===0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
       
        }
        //Update the board
        // Push the move
        //check if the game is over
        //send the output to user
        this.moveCount++


    }
}