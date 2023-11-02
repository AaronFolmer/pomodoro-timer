import { secondsToTime } from "../utils/secondsToTime";

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return (
    <div>
      {secondsToTime(props.mainTime)}
    </div>
  );
}
