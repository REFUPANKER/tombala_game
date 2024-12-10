import GameCard from "@/components/gamecard";
import { gr } from "@/lib/generals";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center items-center h-[50vh]">
        <h1 style={{ letterSpacing: "1rem" }}>TOMBALA</h1>
      </div>
      <div className="w-full flex justify-center items-center h-[50vh]">
        <GameCard numbers={[[gr(),gr(),gr(),gr(),gr()],[gr(),gr(),gr(),gr(),gr()],[gr(),gr(),gr(),gr(),gr()]]} />
      </div>
    </div>
  );
}