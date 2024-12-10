"use client";
import React, { use, useEffect, useState } from "react";
import Stone from "./stone";
import { Button } from "./ui/button";
import { gr } from "@/lib/generals";
import { Skeleton } from "./ui/skeleton";
import imgStone from "../app/res/stone.png";

/**
 * what is going on :
 * it receives card numbers data  
 * and replaces the new stones to it places if exists in card   
 * the "numbers" array points to table that created at beginning of the game
 */
export default function GameCard({ numbers, color = "#46b03a" }: { numbers: number[][], color?: string }) {

    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState<number[]>([]);
    useEffect(() => {
        // load board numbers
        let b: number[][] = Array.from({ length: 3 }, () => Array(9).fill(null));

        for (let i = 0; i < numbers.length; i++) {
            let usedIndex: number[] = [];
            for (let j = 0; j < numbers[i].length; j++) {
                let n = gr(8);
                while (usedIndex.includes(n)) {
                    n = gr(8);
                }
                b[i][n] = numbers[i][j];
                usedIndex.push(n);
            }
        }
        setBoard(b.flat());
        setLoading(false);
    }, []);

    function replaceStone(target: number) {
        // remove item from board
        const x = board.indexOf(target);
        board[x] = 0;
        // add stone
        const cell = document.getElementById(`cell${x}`);
        if (!cell) { return; }
        if (cell?.firstChild) { cell?.removeChild(cell?.firstChild); }
        const stone = document.createElement("div");
        stone.setAttribute("class", "bounce-in w-full aspect-square bg-center bg-contain bg-no-repeat flex justify-center items-center");
        stone.style.backgroundImage = `url(${imgStone.src})`;
        const stonetext = document.createElement("div");
        stonetext.setAttribute("class", "text-xl md:text-2xl mix-blend-difference absolute font-[impact]");
        stonetext.textContent = `${target}`;
        stone.appendChild(stonetext);
        cell?.appendChild(stone);
        // win check
        const sum = board.reduce((acc, current) => acc + current, 0);
        if (sum === 0) {
            Victory();
        }
    }

    function Victory() {
        alert("Game Ended , You Won !!");
    }
    let yq = 0;

    return (
        <div>
            <div className="flex flex-col border-[1rem] rounded-lg border-solid gap-1" style={{ borderColor: color, backgroundColor: color }}>
                {!loading ? (
                    <>
                        {Array.from({ length: 3 }).map((e, i) => (
                            <div key={i} className="flex gap-1">
                                {Array.from({ length: 9 }).map((c, j) => {
                                    const isnull = board[i * 9 + j] === null;
                                    return (
                                        <div
                                            key={i + j + 1}
                                            id={!isnull ? `cell${i * 9 + j}` : "null"}
                                            className="aspect-square p-2 text-3xl min-w-[10vh] flex items-center justify-center border-2 border-solid border-white"
                                            style={{ backgroundColor: isnull ? color : "white" }}>
                                            <div className="mix-blend-difference">
                                                {!isnull && board[i * 9 + j]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}</>) : (
                    <Skeleton>
                        <div className="w-full h-full flex justify-center items-center w-[100vh] h-[30vh]">
                            <h3 className="text-2xl">Loading ...</h3>
                        </div>
                    </Skeleton>
                )}
            </div>
            <Button onClick={(e) => { replaceStone(board[yq++]) }}>Replace Stone</Button>
        </div>
    );
}
