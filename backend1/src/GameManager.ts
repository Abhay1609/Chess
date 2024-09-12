import { WebSocket } from "ws";
import { Game } from "./Game";
import { MOVE , INIT_GAME } from "./message";


export class GameManager{

    private game: Game[];
    private pendingUser:WebSocket|null=null;
    private users:WebSocket[];

    constructor(){
        this.game=[];
        this.pendingUser=null;
        this.users=[]


    }
    addUser(socket:WebSocket){
        this.users.push(socket);
       
        this.addHandler(socket);
        

    }
    removeUser(socket:WebSocket){
        this.users=this.users.filter(user=>user !== socket);
        // Stop the game here because the user left

    }
    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message=JSON.parse(data.toString());
            if(message.type===INIT_GAME){
                if(this.pendingUser){
                    //start a game
                    console.log("JOin Game")
                    const game=new Game(this.pendingUser,socket);
                    this.game.push(game);
                    this.pendingUser=null;
                }else{
                    console.log("Start Game")
                    this.pendingUser=socket;
           

                }

            }
            // if(message.type==="create"){
            //     this.pendingUser=socket;
            //     this.createGame();
            // }
            // if(message.type==="join"){
            //     this.joinGame(socket);

            // }
            if(message.type===MOVE){

                const game=this.game.find(game=>game.player1===socket || game.player2===socket);
                if(game){
                    game.makeMove(socket,message.payload.move);
                }
            }

        })

    }

}