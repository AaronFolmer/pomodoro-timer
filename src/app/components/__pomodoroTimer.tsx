"use client";
import { useState } from "react";

/* hooks */
import { useInterval } from "@/app/hooks/useInterval";

/* components */
import { Button } from "@/app/components/__button";
import { Timer } from "@/app/components/__timer";

/* utils */
import { secondsToTime } from "@/app/utils/secondsToTime";

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <section className="m-auto w-1/2 px-10 py-20">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <Button text="button" />
    </section>
  );
}
