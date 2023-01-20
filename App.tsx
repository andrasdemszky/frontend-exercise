import * as React from 'react';
import './style.css';

const NUMBER_OF_ROWS = 4;

const generateState = () => {
  const state: number[][] = [];
  for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++) {
    if (!state[rowIndex]) {
      state[rowIndex] = [];
    }
    for (let colIndex = 0; colIndex < NUMBER_OF_ROWS; colIndex++) {
      state[rowIndex][colIndex] = 0;
    }
  }
  return state;
};

export default function App() {
  const [state, setState] = React.useState(generateState());

  const onChangeValue = (rowIndex: number, colIndex: number, val: number) => {
    setState((currentState) => {
      currentState[colIndex][rowIndex] = val;
      return JSON.parse(JSON.stringify(currentState));
    });
  };

  const generateRows = () => {
    const rows = [];
    for (let index = 0; index < NUMBER_OF_ROWS; index++) {
      rows.push(
        <TableRow
          rowIndex={index}
          rowValues={state[index]}
          onChangeValue={(row, col, val) => onChangeValue(row, col, val)}
        />
      );
    }
    return rows;
  };

  const generateHeaders = () => {
    const headers = [];
    headers.push(<th className="tg-0lax">{}</th>);
    for (let index = 0; index < NUMBER_OF_ROWS; index++) {
      headers.push(<th className="tg-0lax">{index}</th>);
    }
    headers.push(<th className="tg-0lax">{'TOTAL'}</th>);
    return headers;
  };

  const generateFooters = () => {
    const footers = [];
    footers.push(<td className="tg-0lax">{'TOTAL'}</td>);
    const findSum = (colIndex: number) => {
      let sum = 0;
      for (let index = 0; index < NUMBER_OF_ROWS; index++) {
        sum += state[index][colIndex];
      }
      return sum;
    };
    for (let index = 0; index < NUMBER_OF_ROWS; index++) {
      footers.push(<td className="tg-0lax">{findSum(index)}</td>);
    }
    footers.push(<td className="tg-0lax">{}</td>);
    return footers;
  };

  return (
    <div>
      <table className="tg">
        <thead>
          <tr>{generateHeaders()}</tr>
        </thead>
        <tbody>{generateRows()}</tbody>
        <tr>{generateFooters()}</tr>
      </table>
    </div>
  );
}

interface Row {
  rowValues: number[];
  rowIndex: number;
  onChangeValue: (rowIndex: number, colIndex: number, val: number) => void;
}

const TableRow = (props: Row) => {
  const generateCells = () => {
    const headers = [];
    for (let index = 0; index < NUMBER_OF_ROWS; index++) {
      headers.push(
        <TableCell
          rowIndex={props.rowIndex}
          colIndex={index}
          cellValue={props.rowValues[index]}
          onChangeValue={(rowIndex, colIndex, val) =>
            props.onChangeValue(rowIndex, colIndex, val)
          }
        />
      );
    }
    headers.push(<td>{props.rowValues.reduce((s, a) => (s = s + a))}</td>);
    return headers;
  };
  const incrementRow = (direction: 'up' | 'down') => {};
  return (
    <tr>
      <td className="tg-0lax">
        <button>+</button>
        <button>-</button>
      </td>
      {generateCells()}
    </tr>
  );
};

interface Cell {
  cellValue: number;
  rowIndex: number;
  colIndex: number;
  onChangeValue: (rowIndex: number, colIndex: number, val: number) => void;
}

const TableCell = (props: Cell) => {
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    setValue(props.cellValue);
  }, [props.cellValue]);

  const incrementCell = (direction: 'up' | 'down', val: number) => {
    if (direction === 'up') {
      props.onChangeValue(props.colIndex, props.rowIndex, val + 1);
    } else {
      props.onChangeValue(props.colIndex, props.rowIndex, val + 1);
    }
  };

  return (
    <td className="tg-0lax">
      {value}
      <button onClick={() => incrementCell('up', value)}>+</button>
      <button onClick={() => incrementCell('down', value)}>-</button>
    </td>
  );
};
