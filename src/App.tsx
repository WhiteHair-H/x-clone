import { Sidebar } from "./components/Sidebar";
import { MainFeed } from "./components/MainFeed";
import { RightSidebar } from "./components/RightSidebar";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="flex w-full max-w-[1300px]">
        <Sidebar />
        <main className="flex-1 flex justify-center">
          <MainFeed />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
