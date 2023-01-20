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

  const copyState = (object: number[][]) => {
    return JSON.parse(JSON.stringify(object));
  };

  const onChangeValue = (rowIndex: number, colIndex: number, val: number) => {
    setState((currentState) => {
      currentState[colIndex][rowIndex] = val;
      return copyState(currentState);
    });
  };

  const onIncrementRow = (rowIndex: number, direction: 'up' | 'down') => {
    setState((currentState) => {
      for (let index = 0; index < NUMBER_OF_ROWS; index++) {
        if (direction === 'up') {
          currentState[rowIndex][index]++;
        } else {
          currentState[rowIndex][index]--;
        }
      }
      return JSON.parse(JSON.stringify(currentState));
    });
  };

  const onIncrementColumn = (colIndex: number, direction: 'up' | 'down') => {
    setState((currentState) => {
      for (let index = 0; index < NUMBER_OF_ROWS; index++) {
        if (direction === 'up') {
          currentState[index][colIndex]++;
        } else {
          currentState[index][colIndex]--;
        }
      }
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
          onIncrementRow={(row, dir) => onIncrementRow(row, dir)}
        />
      );
    }
    return rows;
  };

  const generateHeaders = () => {
    const headers = [];
    headers.push(<th>{}</th>);
    for (let index = 0; index < NUMBER_OF_ROWS; index++) {
      headers.push(
        <th>
          <button
            className="button-style"
            onClick={() => onIncrementColumn(index, 'up')}
          >
            +
          </button>
          <button
            className="button-style"
            onClick={() => onIncrementColumn(index, 'down')}
          >
            -
          </button>
        </th>
      );
    }
    headers.push(<th>{'TOTAL'}</th>);
    return headers;
  };

  const generateFooters = () => {
    const footers = [];
    footers.push(<td className="bold">{'TOTAL'}</td>);
    const findSum = (colIndex: number) => {
      let sum = 0;
      for (let index = 0; index < NUMBER_OF_ROWS; index++) {
        sum += state[index][colIndex];
      }
      return sum;
    };
    for (let index = 0; index < NUMBER_OF_ROWS; index++) {
      footers.push(<td className="bold">{findSum(index)}</td>);
    }
    footers.push(<td>{}</td>);
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
  onIncrementRow: (rowIndex: number, direction: 'up' | 'down') => void;
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
    headers.push(
      <td className="bold">{props.rowValues.reduce((s, a) => (s = s + a))}</td>
    );
    return headers;
  };

  return (
    <tr>
      <td>
        <button
          className="button-style"
          onClick={() => props.onIncrementRow(props.rowIndex, 'up')}
        >
          +
        </button>
        <button
          className="button-style"
          onClick={() => props.onIncrementRow(props.rowIndex, 'down')}
        >
          -
        </button>
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
  const incrementCell = (direction: 'up' | 'down', val: number) => {
    if (direction === 'up') {
      props.onChangeValue(props.colIndex, props.rowIndex, val + 1);
    } else {
      props.onChangeValue(props.colIndex, props.rowIndex, val - 1);
    }
  };

  return (
    <td>
      {props.cellValue}
      <button
        className="button-style"
        onClick={() => incrementCell('up', props.cellValue)}
      >
        +
      </button>
      <button
        className="button-style"
        onClick={() => incrementCell('down', props.cellValue)}
      >
        -
      </button>
    </td>
  );
};
