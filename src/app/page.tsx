import { PomodoroTimer } from "./components/__pomodoroTimer";

export default function Home() {
  return (
    <main>
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </main>
  );
}
