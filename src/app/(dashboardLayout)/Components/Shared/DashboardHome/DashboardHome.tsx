import { Separator } from "@/components/ui/separator";
import HeaderPart from "./HeaderPart";
import ThreeTabSection from "./ThreeTabSection";

const DashboardHome = () => {
  return (
    <div className="px-5 py-10">
      <div className="grid grid-cols-5 grid-rows-1 gap-4">
        <div className="col-span-3 border border-solid border-red-500 rounded-lg p-3">
          <HeaderPart />
          <Separator className="bg-gray-300 my-2" />
          <ThreeTabSection />
        </div>
        <div className="col-span-2 bg-blue-300 col-start-4 border border-solid rounded-lg p-3">
          2
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
