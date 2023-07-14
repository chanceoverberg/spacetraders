import { FunctionComponent, useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';

const ExpiredNotice = () => {
    return (
        <></>
    );
  };

  interface dateProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
  }

  const ShowCounter = (props: dateProps) => {
    const {days, hours, minutes, seconds} = props;
    
    return (
      <div className="show-counter">
          <DateTimeDisplay value={days} type={'Days'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </div>
    );
  };

  interface UpdateShipAction {
    (): void;
  }

interface IProps {
    targetDate: string | number | Date,
    updateShipAction: UpdateShipAction;
}

const CountdownTimer: FunctionComponent<IProps> = (props: IProps) => {
    const { targetDate, updateShipAction } = props;
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    // Updates shipAction in FleetCard when the ship arrives so that the ship data refreshes
    useEffect(() => {
        if (days + hours + minutes + seconds === 0) {
            updateShipAction();
        }
    },[days, hours, minutes, seconds]);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;