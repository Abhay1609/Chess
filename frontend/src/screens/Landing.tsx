import { useNavigate } from "react-router-dom"
import { Button } from "../component/Button";



export const Landing=()=>{
    const navigate=useNavigate();
    return <div>
        <div className="pt-2">
            <div className="grid grid-cols-1 gap4 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src={"/chessBoard.jpeg"} 
                    className="max-w-96"
                    />
             

                </div>
                <div>
                    <div className="flex justify-center">
                    <h1 className="text-4xl
                    font-bold text-white">Play chess online on </h1>
                    <Button onClick={()=>navigate("/game")}>
                        Play Online

                    </Button>


                    </div>
                </div>
            </div>
        </div>
    </div>

}