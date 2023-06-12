/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.scss";

interface TableProps {
  columns: Array<any>;
  data: Array<any>;
}

function Table({ columns, data }: TableProps) {
  if (!columns || !data) return <div className="table table--nodata">No Data</div>;

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {columns.map((el) => (
              <th key={el.keyData}>{el.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((el: any) => (
            <tr key={el.id}>
              {columns.map((el1) => (
                <td key={el1.keyData}>{el[el1.keyData]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
