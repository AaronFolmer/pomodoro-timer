"use client";
import { useEffect, useState } from "react";

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
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");
  }, [working, resting]);

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  };
  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setResting(true);
    setWorking(false);
    setMainTime(props.pomodoroTime);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null
  );
  return (
    <section className="bg-white py-20 font-medium rounded-xl">
      <h2 className="text-lg my-3">You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="my-10 justify-center flex gap-10">
        <Button
          text="work"
          onClick={() => configureWork()}
          className="px-5 py-3 md:px-20 md:py-5 rounded-full bg-gray-200 hover:bg-gray-100 hover:border-black-500 border-2 transition-all duration-300 ease-in-out"
        />
        <Button
          text={timeCounting ? "Pause" : "Play"}
          onClick={() => setTimeCounting(!timeCounting)}
          className={
            !working && !resting
              ? "hidden"
              : "px-5 py-3 md:px-20 md:py-5 rounded-full bg-gray-200 hover:bg-gray-100 hover:border-black-500 border-2 transition-all duration-300 ease-in-out"
          }
        />
        <Button
          text="resting"
          onClick={() => configureRest(false)}
          className="px-5 py-3 md:px-20 md:py-5 rounded-full bg-gray-200 hover:bg-gray-100 hover:border-black-500 border-2 transition-all duration-300 ease-in-out"
        />
      </div>
    </section>
  );
}
