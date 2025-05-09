import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Users, Calendar } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 bg-[url(/placeholder.svg?height=500&width=1000)] bg-center bg-no-repeat opacity-5 dark:opacity-10"></div>
      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                Next-Gen HR Platform
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Transform your{" "}
                <span className="text-violet-600 dark:text-violet-400">
                  people operations
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
                Streamline recruitment, onboarding, performance management, and
                employee engagement with our all-in-one HR solution.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Book a Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium">Talent Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium">
                  Performance Analytics
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium">Time Tracking</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[400px] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl sm:h-[450px] lg:h-[500px]">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl"></div>
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="HR Dashboard"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent opacity-60"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 sm:block">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Employee Satisfaction
                  </p>
                  <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    94%
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 hidden rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 sm:block">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <BarChart2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Productivity Boost
                  </p>
                  <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    37%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
