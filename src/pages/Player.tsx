import { ClassItem } from "../components/ClassItem";
import { Header } from "../components/Header";

export function Player() {
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">video</div>
          <aside className="w-80 border-l border-zinc-800 bg-zinc-900 h-[600px]">
            <ClassItem />
          </aside>
        </main>
      </div>
    </div>
  );
}
