import { Card, CardContent } from "@/components/ui/card";
import { Heart, Plane, User, Users } from "lucide-react";

const leaveTypes = [
  {
    id: 1,
    name: "Annual Leave",
    icon: Plane,
    gradient: "from-blue-500 to-blue-600",
    currentAbsent: 2,
  },
  {
    id: 2,
    name: "Sick Leave",
    icon: Heart,
    gradient: "from-red-500 to-red-600",
    currentAbsent: 1,
  },
  {
    id: 3,
    name: "Personal Leave",
    icon: User,
    gradient: "from-green-500 to-green-600",
    currentAbsent: 1,
  },
  {
    id: 4,
    name: "Maternity/Paternity",
    icon: Users,
    gradient: "from-purple-500 to-purple-600",
    currentAbsent: 0,
  },
];

// const employeeLeaveData = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalLeavesTaken: 12,
//     department: "Marketing",
//   },
//   {
//     id: 2,
//     name: "Mike Chen",
//     avatar: "/placeholder.svg?height=40&width=40",
//     totalLeavesTaken: 8,
//     department: "Engineering",
//   },
// ];

const CurrentlyAbsence = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4">
      <div className="lg:col-span-1">
        <>
          <div className="space-y-4">
            {leaveTypes.map((leaveType) => {
              const IconComponent = leaveType.icon;

              return (
                <Card
                  key={leaveType.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg rounded-2xl overflow-hidden p-0"
                >
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-r ${leaveType.gradient} p-4 text-white relative overflow-hidden rounded-2xl`}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {leaveType.name}
                            </h3>
                            <p className="text-white/80 text-sm">
                              Currently absent
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            {leaveType.currentAbsent}
                          </div>
                          <div className="text-white/80 text-sm">
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
      <div className="col-span-2 bg-blue-300">2</div>
    </div>
  );
};

export default CurrentlyAbsence;
