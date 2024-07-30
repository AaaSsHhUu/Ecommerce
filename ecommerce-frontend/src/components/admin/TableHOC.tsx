import { Column, TableOptions, useTable, useSortBy, usePagination } from "react-table";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { useState } from "react";

function TableHOC<T extends Object>(
    columns: Column<T>[],
    data: T[],
    containerClassname: string,
    heading: string,
    showPagination: boolean
) {
    const [pageNo, setPageNo] = useState(1);

    const options: TableOptions<T> = {
        columns,
        data,
        initialState: {
            pageSize: 5
        }
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        state: {
            pageIndex
        },
        gotoPage
    } = useTable(options, useSortBy, usePagination);

    return function HOC() {
        return (
            <div className={containerClassname}>
                <h2 className="heading">{heading}</h2>

                <table className="table" {...getTableProps()}>

                    <thead >
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render("Header")}
                                            {column.isSorted && <span>{" "}{column.isSortedDesc ? <HiSortAscending /> : <HiSortDescending />}</span>}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))
                                    }
                                </tr>
                            })
                        }
                    </tbody>

                </table>

                {
                    showPagination && (
                        <div className="table-pagination">
                            <div className="page-info">
                                <button disabled={!canPreviousPage} onClick={previousPage}>Prev</button>

                                <span>{pageIndex + 1} out of {pageCount}</span>

                                <button disabled={!canNextPage} onClick={nextPage}>Next</button>
                            </div>
                            <div className="goto-page">
                                <input type="number" value={pageNo} onChange={(e) => setPageNo(parseInt(e.target.value))} placeholder="Page No" />
                                <button onClick={() => gotoPage(pageNo - 1)}>select</button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default TableHOC
