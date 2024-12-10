"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { gr } from "@/lib/generals";
import imgStone from "../app/res/stone.png";
import toast from "react-hot-toast";
import { Toggle } from "./ui/toggle";
import { StarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function GameCard({ numbers, color = "#252525", user, rotated = false, pullenStone }: { numbers: number[], color?: string, user: string, rotated?: boolean, pullenStone?: number }) {
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState<number[]>([]);

    const [boardColor, setBoardColor] = useState(color);
    const [chinkoStack, setChinkoStack] = useState([false, false, false]);
    useEffect(() => {
        const b = Array(27).fill(null);
        const usedIndex: number[] = [];
        for (let i = 0; i < numbers.length; i++) {
            let n = gr(26);
            while (usedIndex.includes(n)) {
                n = gr(26);
            }
            b[n] = numbers[i];
            usedIndex.push(n);
        }
        setBoard(b);
        setBoardColor(`rgb(${gr(170)},${gr(170)},${gr(170)})`);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (pullenStone) {
            replaceStone(pullenStone);
            let row1 = 1 + board.slice(0, 9).filter((e, i) => { return e != null ? e : 0 }).length;
            let row2 = 1 + board.slice(9, 18).filter((e, i) => { return e != null ? e : 0 }).length;
            let row3 = 1 + board.slice(18, 27).filter((e, i) => { return e != null ? e : 0 }).length;
            let stack: boolean[] = chinkoStack;
            stack[0] = row1 == 1 ? true : false;
            stack[1] = row2 == 1 ? true : false;
            stack[2] = row3 == 1 ? true : false;
            setChinkoStack(stack);
        }
    }, [pullenStone]);

    function replaceStone(target: number) {
        const x = board.indexOf(target);
        if (x === -1) return;
        // Remove stone from the board
        const updatedBoard = [...board];
        updatedBoard[x] = 0;
        setBoard(updatedBoard);
        // Add a new stone to the cell
        const cell = document.getElementById(`cell${x}_${user}`);
        if (!cell) return;
        cell.innerHTML = "";
        const stone = document.createElement("div");
        stone.setAttribute("class", "bounce-in w-full aspect-square bg-center bg-contain bg-no-repeat flex justify-center items-center");
        stone.style.backgroundImage = `url(${imgStone.src})`;

        const stonetext = document.createElement("div");
        stonetext.setAttribute("class", "text-sm md:text-xl mix-blend-difference absolute font-[impact]");
        stonetext.textContent = `${target}`;
        stone.appendChild(stonetext);
        cell.appendChild(stone);

        // Check for victory
        toast.success(`Stone replaced to ${user}!`, { icon: "🎉", position: "top-left" });
        if (updatedBoard.every((item) => item === 0 || item === null)) {
            Victory();
        }
    }

    function Victory() {
        toast.success(`Game Ended, ${user} Won!!`, {
            style: {
                padding: "1rem",
                fontSize: "1.3rem",
            },
        });
    }

    return (
        <div className={`w-fit h-fit flex flex-col items-center select-none`}>
            <div className={`p-2 flex items-center justify-between ${rotated ? "w-[90%]" : "w-[50%]"} rounded-t-lg`} style={{ backgroundColor: boardColor }}>
                <h2 className="mix-blend-lighten text-xl ">{user}</h2>
                <div title="Chinko Stack" className="flex items-center gap-1">
                    {chinkoStack.filter((e)=>(e)).length} <StarIcon fill="white" />
                </div>
            </div>

            <div className={`flex flex-col border-8 md:border-[1rem] rounded-lg border-solid gap-1 w-full`} style={{ borderColor: boardColor, backgroundColor: boardColor }}>
                {!loading ? (
                    <>
                        {Array.from({ length: rotated ? 9 : 3 }).map((_, i) => (
                            <div key={i} className="flex gap-1">
                                {Array.from({ length: rotated ? 3 : 9 }).map((_, j) => {
                                    const index = rotated ? j * 9 + i : i * 9 + j;
                                    const isnull = board[index] === null;
                                    return (
                                        <div
                                            key={index}
                                            id={!isnull ? `cell${index}_${user}` : "null"}
                                            className={`aspect-square md:p-2 md:text-2xl min-w-[4vh] md:min-w-[8vh] flex items-center justify-center border-2 border-solid border-white `}
                                            style={{ backgroundColor: isnull ? "transparent" : "#151515" }}>
                                            <div className={`mix-blend-difference cursor-default`}>
                                                {!isnull && board[index]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="flex justify-center items-center w-full p-5">
                        <h3 className="text-2xl">Loading...</h3>
                    </div>
                )}
            </div>
            {/* <Button onClick={() => replaceStone(board.find((num) => num !== 0 && num !== null) ?? 0)}>Replace Stone</Button> */}
        </div>
    );
}
