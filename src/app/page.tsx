import { PomodoroTimer } from "./components/__pomodoroTimer";

export default function Home() {
  return (
    <main className="m-auto text-center py-32 px-20 md:py-64 md:px-96 lg:py-46 lg:px-60">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </main>
  );
}
