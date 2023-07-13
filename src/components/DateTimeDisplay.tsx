import { FunctionComponent } from 'react';

interface IProps {
    value: any,
    type: any,
    isDanger: boolean,
}

const DateTimeDisplay: FunctionComponent<IProps> = (props: IProps) => {
    const {value, type, isDanger} = props;

  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;