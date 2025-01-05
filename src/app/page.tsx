import Controls from "./components/controls";
import Wallpaper from "./components/wallpaper";

export default function Home() {
  return (
    <div className="">
      <div className="mt-8 w-full flex justify-center items-center relative">
        <div className="w-[48%] flex flex-col items-center justify-center absolute top-0">
          <Wallpaper />
          <Controls/>
        </div>
      </div>
    </div>
  );
}
