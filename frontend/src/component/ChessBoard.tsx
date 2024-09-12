import { SQUARES,PieceSymbol,Square,Color } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";
export const ChessBoard=({chess,board,socket,setBoard}:{
    board:({
        square:Square;
        type:PieceSymbol;

        color:Color;

    }|null) [][];
    socket:WebSocket;
    setBoard:any;
    chess:any;
})=>{
    const [from,setFrom]=useState<null|Square>(null);
    const [to,setTo]=useState<null|Square>(null)
    return <div className="text-white-200">
        {
            board.map((row,i)=>{
                return <div key={i} className="flex">
                    {row.map((square,j)=>{
                        
                        const squareRepresentation=String.fromCharCode(97+(j%8))+""+(8-i) as Square
                        return <div
                        onClick={()=>{
                            
                            if(!from){
                                setFrom(squareRepresentation);
                            }else{
                                
                                setTo(square?.square??null);
                                
                                socket.send(JSON.stringify({
                                    type:MOVE,
                                    payload:{
                                        move:{
                                        from,
                                        to:squareRepresentation,}
                                    }
                                }))
                                chess.move({
                                  
                                        from,
                                        to:squareRepresentation,
                      

                                });
                                setBoard(chess.board())

                                setFrom(null)

                            }

                        }}
                        
                        key={j} className={`w-20 h-20 ${(i+j)%2==0?"bg-slate-600":"bg-white"}`}>
                            <div className="w-full justify-center flex h-full">
                                <div className="h-full justify-center flex flex-col">
                           {square?<img className="w-10" src={`/${square?.color+square?.type}.png`} />:""}
                            </div>
                            </div>
                        </div>
                    })}
                    </div>
            })
        }
        
    </div>
}