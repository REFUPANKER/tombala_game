"use client";
import GameCard from "@/components/gameboard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CreateGameBoards, gr } from "@/lib/generals";
import { ArrowDownUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const users: string[] = ["user1", "user2", "user3"];
  const boards: number[][] = CreateGameBoards();
  const [shownStones, setShownStones] = useState<number[]>([]);
  const [pullenStone, setPullenStone] = useState<number>();
  const [stonesLeft, setStonesLeft] = useState(90);

  function PullStone() {
    let n = gr();
    while (shownStones.includes(n)) {
      n = gr();
    }
    setPullenStone(n);
    setStonesLeft((pre) => pre - 1);
    setShownStones((pre) => [...pre, n]);
  }

  useEffect(() => {
    if (stonesLeft <= 0) {
      alert("GAME ENDED");
    }
  }, [stonesLeft])

  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-center items-center">
        <h1 style={{ letterSpacing: "1rem" }}>TOMBALA</h1>
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row gap-3 justify-center items-center h-[100vh]">
        <div className="w-full h-full flex flex-col items-center justify-around ">
          <div className="flex flex-col w-[50%]">
            <Button variant={"outline"} onClick={(e) => PullStone()}>Pull Stone | {stonesLeft} Stones Left</Button>
            <div className="flex flex-wrap max-h-[10vh] overflow-auto">
              {shownStones.map((e, i) => (
                <div key={i} className="m-1 border-1 border-solid border-white">
                  {e}
                </div>
              ))}
            </div>
          </div>
          <GameCard pullenStone={pullenStone} numbers={boards[0]} user="player" />
        </div>
        <div className="overflow-hidden h-full w-[35%] flex flex-col justify-center gap-3 items-center">
          <h2 className="text-2xl flex gap-2 items-center">Other Players<ArrowDownUpIcon /> </h2>
          <Carousel
            opts={{
              align: "center",
              duration: 10,
            }}
            orientation="vertical"
            className="h-[70%] flex flex-col justify-center gap-0 overflow-hidden">
            <CarouselContent className="h-full w-full flex flex-col items-center">
              {boards.map((e, i) => {
                if (i > 0) {
                  return (
                    <CarouselItem
                      key={`board${i}`}
                      className="h-[calc(100%/3)] flex justify-center items-center">
                      <div className="scale-[0.7]">
                        <GameCard pullenStone={pullenStone} numbers={e} user={users[i - 1]} rotated={true} />
                      </div>
                    </CarouselItem>
                  );
                }
              })}
            </CarouselContent>
          </Carousel>

        </div>
      </div>
    </div>
  );
}