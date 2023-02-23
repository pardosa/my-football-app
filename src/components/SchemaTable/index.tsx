import React, { useMemo } from "react";
import { SchemaObject } from "openapi3-ts";
import "./index.scss";

import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  useTheme,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

export interface IColumnConfig<T> {
  align?: "center";
  flexGrow?: number;
  hidden?: boolean;
  hoverTitle?: string;
  isFilterable?: boolean;
  renderCell?: (rowData: T, index: number) => React.ReactElement | null;
  renderData?: (rowData: T, index: number) => string;
  sort?: (a: T, b: T, sortAsc: boolean) => number;
  sortable?: boolean;
  title?: string | React.ReactElement;
  width?: number;
  order?: number;
  excludeOnExport?: boolean;
}

interface ISimpleTableProps<T> {
  config?: {
    [propertyName: string]: IColumnConfig<T>;
  };
  data?: null | T[];
  defaultSortColumn?: keyof T;
  defaultSortAsc?: boolean;
  isSearchable?: boolean;
  isSortable?: boolean;
  isExportable?: boolean;
  onRowClick?: (rowData: T, rowIndex: number, event: React.MouseEvent) => void;
  rowClassName?: (rowData: T) => string;
  rowHeight?: number;
  schema: SchemaObject;
  style?: React.CSSProperties;
  width: number;
  height: number;
}

export interface IRenderData {
  _index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export default function SchemaTable<T>(
  props: ISimpleTableProps<T>
): JSX.Element {
  const { config, data, onRowClick, rowClassName, schema, style } = props;
  const [renderData, setRenderData] = React.useState<IRenderData[]>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { properties = {} } = schema;
  const columnNames = React.useMemo<string[]>(() => {
    const columns = Object.keys(properties);
    if (!config) {
      return columns;
    }

    const hiddenColumns = Object.entries(config).reduce<string[]>(
      (prev, [propertyName, propertyConfig]) => {
        if (propertyConfig.hidden) {
          prev.push(propertyName);
        }
        return prev;
      },
      []
    );

    return columns
      .filter((key) => !hiddenColumns.includes(key))
      .sort((columnA, columnB) => {
        let orderA = config[columnA] ? config[columnA].order : undefined;
        if (orderA === undefined) {
          orderA = Object.keys(properties).findIndex(
            (propertyName) => propertyName === columnA
          );
        }
        let orderB = config[columnB] ? config[columnB].order : undefined;
        if (orderB === undefined) {
          orderB = Object.keys(properties).findIndex(
            (propertyName) => propertyName === columnB
          );
        }
        if (orderA === -1) {
          return 1;
        }
        if (orderB === -1) {
          return -1;
        }
        return orderA - orderB;
      });
  }, [config, properties]);

  // Collect all data that should be displayed in the form

  React.useEffect(() => {
    setRenderData(
      data
        ? data.map((object, rowIndex) =>
            columnNames.reduce(
              (prev: IRenderData, propertyName) => {
                const schema = properties[propertyName] as SchemaObject;
                const propertyConfig = config
                  ? config[propertyName]
                  : undefined;
                if (propertyConfig?.renderData) {
                  prev[propertyName] = propertyConfig.renderData(
                    object,
                    rowIndex
                  );
                  return prev;
                }
                if (!schema) {
                  prev[propertyName] = "?";
                  return prev;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rawValue = object[propertyName as keyof T] as any;
                switch (schema.type) {
                  case "array":
                    prev[propertyName] = JSON.stringify(rawValue);
                    return prev;

                  case "boolean":
                    prev[propertyName] = rawValue ? "✓" : "✕";
                    return prev;

                  case "number":
                    prev[propertyName] = `${rawValue}`;
                    return prev;

                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  case "string":
                    if (schema.format === "date" && rawValue) {
                      prev[propertyName] =
                        (rawValue as string) === "2999-12-31"
                          ? "-"
                          : new Date(rawValue).toLocaleString();
                      return prev;
                    }
                    if (schema.format === "date-time" && rawValue) {
                      prev[propertyName] = new Date(rawValue).toLocaleString();
                      return prev;
                    }
                    if (schema.enum) {
                      prev[propertyName] = _.startCase(rawValue);
                      return prev;
                    }
                  // fallthrough

                  default:
                    prev[propertyName] = rawValue ? `${rawValue}` : "";
                    return prev;
                }
              },
              { _index: rowIndex }
            )
          )
        : undefined
    );
  }, [columnNames, config, properties, data]);

  const tableHead = React.useCallback(
    (index: number) => {
      const propertyName = columnNames[index];
      const schema = properties[propertyName] as SchemaObject;
      const propertyConfig = config ? config[propertyName] : undefined;
      const divProps = {
        key: propertyName,
        style,
        className: `p-1 `,
      };
      if (!schema) {
        return <div {...divProps} />;
      }

      return (
        <TableCell {...divProps} sortDirection={false}>
          {propertyConfig?.title || _.startCase(propertyName)}
        </TableCell>
      );
    },
    [columnNames, properties, config, style]
  );

  const onColumnClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onRowClick || !data) {
        return;
      }
      const { rowIndex } = e.currentTarget.dataset;
      if (!rowIndex) {
        return;
      }
      if (renderData) {
        const row = renderData[parseInt(rowIndex, 10)];
        onRowClick(data[row._index], row._index, e);
      }
    },
    [renderData, onRowClick, data]
  );

  const tableColumn = React.useCallback(
    (rowIndex: number, columnIndex: number): React.ReactElement | null => {
      if (!renderData) {
        return null;
      }
      const propertyName = columnNames[columnIndex];
      const propertyConfig = config ? config[propertyName] : undefined;
      const row = renderData[rowIndex];
      const schema = properties[propertyName] as SchemaObject;
      const divProps = {
        "data-row-index": rowIndex,
        "data-column-index": columnIndex,
        key: propertyName,
        style,
        onClick: onColumnClick,
        className: `${
          data && row && rowClassName ? rowClassName(data[row._index]) : ""
        }`,
      };

      if (propertyConfig?.renderCell && data) {
        return (
          <TableCell {...divProps}>
            {propertyConfig.renderCell(data[row._index], rowIndex)}
          </TableCell>
        );
      }

      if (!schema) {
        return null;
      }

      return <TableCell {...divProps}>{row[propertyName]}</TableCell>;
    },
    [
      renderData,
      columnNames,
      config,
      properties,
      style,
      onColumnClick,
      rowClassName,
      data,
    ]
  );

  const tablePaginated = useMemo(() => {
    return renderData ? (
      <TableBody>
        {(rowsPerPage > 0
          ? renderData.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : renderData
        ).map((data, rowIndex: number) => {
          return (
            <TableRow hover tabIndex={-1} key={`tr-${rowIndex}`}>
              {columnNames.map((clm, columnIndex: number) =>
                tableColumn(page * rowsPerPage + rowIndex, columnIndex)
              )}
            </TableRow>
          );
        })}
      </TableBody>
    ) : (
      <></>
    );
  }, [renderData, rowsPerPage, page, columnNames, tableColumn]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <TableHead>
            <TableRow>{columnNames.map((clm, idx) => tableHead(idx))}</TableRow>
          </TableHead>

          {data ? tablePaginated : <CircularProgress />}
          {renderData ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
                  colSpan={columnNames.length}
                  count={renderData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </TableContainer>
    </Paper>
  );
}
