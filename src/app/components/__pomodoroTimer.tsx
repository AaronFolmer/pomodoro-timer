"use client";
import { useCallback, useEffect, useState } from "react";

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
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null
  );

  /* configuring work and resting */

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  }, [
    setMainTime,
    setTimeCounting,
    setWorking,
    setResting,
    props.pomodoroTime,
  ]);
  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setResting(true);
      setWorking(false);
      setMainTime(props.pomodoroTime);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [
      setTimeCounting,
      setResting,
      setWorking,
      setMainTime,
      props.pomodoroTime,
      props.longRestTime,
      props.shortRestTime,
    ]
  );

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(false);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoro(numberOfPomodoro + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    cyclesQtdManager,
    numberOfPomodoro,
    props.cycles,
    completedCycles,
  ]);
  return (
    <section className="bg-white py-20 font-medium rounded-xl">
      <h2 className="text-lg my-3">You are: {working ? 'Working' : 'Resting'}</h2>
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
      <div className="text-center">
        <p>Cycles finished: {completedCycles}</p>
        <p>Hours worked: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluded: {numberOfPomodoro}</p>
      </div>
    </section>
  );
}
