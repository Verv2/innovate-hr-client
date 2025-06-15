import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { transformLeaveMetaToArray } from "@/lib/utils";
import { TLeaveToday, TLeaveTypes } from "@/types";
import SingleLeaveCard from "./SingleLeaveCard";

const CurrentlyAbsence = ({
  meta,
  data,
}: {
  meta: TLeaveTypes;
  data: TLeaveToday[];
}) => {
  console.log("from tab right", data);
  const leaveTypes = transformLeaveMetaToArray(meta);
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4 items-center">
      <div className="lg:col-span-1">
        <>
          <div className="space-y-4">
            {leaveTypes.map((leaveType) => {
              const IconComponent = leaveType.icon;

              return (
                <Card
                  key={leaveType.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg rounded-lg overflow-hidden p-0"
                >
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-r ${leaveType.gradient} px-4 text-white relative overflow-hidden rounded-lg`}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">
                              {leaveType.name}
                            </h3>
                            <p className="text-white/80 text-[12px]">
                              Currently absent
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">
                            {leaveType.currentAbsent}
                          </div>
                          <div className="text-white/80 text-[12px]">
                            {leaveType.currentAbsent === 1
                              ? "person"
                              : "people"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      </div>
      <div className="col-span-2">
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{
              align: "center",
              slidesToScroll: 2,
            }}
          >
            <CarouselContent className="ml-0">
              {data.map((item) => (
                <CarouselItem key={item.id} className="basis-1/2 pl-4">
                  <SingleLeaveCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyAbsence;
