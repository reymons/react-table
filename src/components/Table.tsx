import React from "react";
import styles from "./../styles/Table.module.css";
import Cell from "./Cell";
import Head from "./Head";

interface ITable {
  rowsData: Array<any[]>;
  headNames: Array<string>;
  cellUrls?: Array<string[]>;
  headsWithSort?: Array<string>;
  sortFunctions?: Array<(a: any, b: any) => number>;
  columnWidths?: Array<string>;
  columnsWithMobileHide?: Array<number>;
  mobileSortBtnData?: {
    name: string;
    sortedColumn: number;
  } | null;
}

const Table = ({
  rowsData,
  headNames,
  headsWithSort = [],
  cellUrls = [],
  columnWidths = [],
  columnsWithMobileHide = [],
  mobileSortBtnData = null,
  sortFunctions
}: ITable) => {
  const [thisRowsData, setThisRowsData] = React.useState(rowsData);
  const sortOrdersRef = React.useRef<Array<"ascending" | "descending">>(headNames.map(_ => "ascending"))

  const onHeadClick = React.useCallback((headIdx: number) => {
    const sortOrder = sortOrdersRef.current[headIdx];
    const newRowsData = [...rowsData];

    if (sortFunctions && sortFunctions[headIdx]) {
      newRowsData.sort((a, b) => {
        return sortFunctions[headIdx](a[headIdx], b[headIdx]);
      });
    } else {
      newRowsData.sort((a, b) => {
        const param1 = a[headIdx];
        const param2 = b[headIdx];
        if (param1 && param2) {
          return param1.localeCompare(param2)
        }
        if (param1 && !param2) {
          return 1;
        }
        if (!param1 && param2) {
          return -1;
        }
        return 0;
      });
    }

    if (sortOrder === "descending") {
      newRowsData.reverse();
    }

    sortOrdersRef.current = sortOrdersRef.current.map((sortOrder, idx) => {
      if (idx === headIdx) return sortOrder === "ascending" ? "descending" : "ascending";
      return sortOrder;
    })

    setThisRowsData(newRowsData);
  }, [rowsData, sortFunctions])

  const heads = React.useMemo(() => {
    return headNames.map((hName, idx) => {
      return (
        <Head
          key={idx}
          onClick={() => onHeadClick(idx)}
          withMobileHide={columnsWithMobileHide.includes(idx)}
          style={{
            width: columnWidths[idx] ? columnWidths[idx] : "auto",
            cursor: headsWithSort.includes(hName) ? "pointer" : "default"
          }}
        >
          {hName}
        </Head>
      )
    });
  }, [headNames, headsWithSort, columnsWithMobileHide, columnWidths, onHeadClick]);

  const rows = React.useMemo(() => {
    return thisRowsData.map((thisRowData, rowIdx) => {
      return (
        <div className={styles.row} key={rowIdx}>
          {
            thisRowData.map((data: any, idx) => (
              <Cell 
                url={(cellUrls[idx] && cellUrls[idx][rowIdx]) ? cellUrls[idx][rowIdx] : ""}
                key={idx}
                withMobileHide={columnsWithMobileHide.includes(idx)}
              >
                {data}
              </Cell>
            ))
          }
        </div>
      )
    })
  }, [thisRowsData, cellUrls, columnsWithMobileHide]);

  return (
    <div className={styles.table}>
      <div className={styles.row}>{heads}</div>
      {rows}
      {
        mobileSortBtnData &&
        <div className={styles.sortBtnWrapper}>
          <button 
            className={styles.sortBtn} 
            onClick={() => onHeadClick(mobileSortBtnData.sortedColumn)}
          >
            {mobileSortBtnData.name}
          </button>
        </div>
      }
    </div>
  )
}

export default React.memo(Table);