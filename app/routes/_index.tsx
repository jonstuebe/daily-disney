import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Disney Trivia" },
    { name: "description", content: "Daily Disney Trivia!" },
  ];
};

export default function Index() {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-6">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-4xl sm:tracking-tight">
        Daily Disney
      </h2>
      <div>
        <div className="rounded-lg border border-gray-200 dark:border-slate-500 shadow-md bg-white/10 hover:bg-white/2">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
              Question 1: What is the capital of France?
            </h3>
            <div className="flex flex-col space-y-4">
              <button className="inline-flex dark:text-white text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-200 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                A. Berlin
              </button>
              <button className="inline-flex dark:text-white text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-200 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                B. Madrid
              </button>
              <button className="inline-flex dark:text-white text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-200 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                C. Paris
              </button>
              <button className="inline-flex dark:text-white text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-200 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                D. Rome
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
