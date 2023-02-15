import React, { useMemo } from "react";
import { SchemaObject } from "openapi3-ts";
import { formatMoney, localeFormat } from "../../types/utilities";
import "./index.scss";

import _ from "lodash";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
    [propName: string]: IColumnConfig<T>;
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

export default function SchemaTable<T>(
  props: ISimpleTableProps<T>
): JSX.Element {
  const {
    config,
    data,
    isSearchable,
    isExportable,
    onRowClick,
    rowClassName,
    schema,
    style,
  } = props;
  const location = useLocation();
  const [renderData, setRenderData] = React.useState<IRenderData[]>();
  const [columnSort, setColumnSort] = React.useState<string>();
  const [isSortAsc, setIsSortAsc] = React.useState<boolean>(true);
  const sortedData: T[] = useMemo(
    () => _.orderBy(data, [columnSort], [isSortAsc ? "asc" : "desc"]) as T[],
    [data, columnSort, isSortAsc]
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [rowClicked, setRowClicked] = React.useState<number>(-1);

  const { properties = {} } = schema;
  const columnNames = React.useMemo<string[]>(() => {
    const columns = Object.keys(properties);
    if (!config) {
      return columns;
    }

    const invisibleColumns = Object.entries(config).reduce<string[]>(
      (prev, [propName, propConfig]) => {
        if (propConfig.hidden) {
          prev.push(propName);
        }
        return prev;
      },
      []
    );

    return columns
      .filter((key) => !invisibleColumns.includes(key))
      .sort((columnA, columnB) => {
        let orderA = config[columnA] ? config[columnA].order : undefined;
        if (orderA === undefined) {
          orderA = Object.keys(properties).findIndex(
            (propName) => propName === columnA
          );
        }
        let orderB = config[columnB] ? config[columnB].order : undefined;
        if (orderB === undefined) {
          orderB = Object.keys(properties).findIndex(
            (propName) => propName === columnB
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
      sortedData
        ? sortedData.map((object, rowIndex) =>
            columnNames.reduce(
              (prev: IRenderData, propName) => {
                const schema = properties[propName] as SchemaObject;
                const propConfig = config ? config[propName] : undefined;
                if (propConfig?.renderData) {
                  prev[propName] = propConfig.renderData(object, rowIndex);
                  return prev;
                }
                if (!schema) {
                  prev[propName] = "?";
                  return prev;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rawValue = object[propName as keyof T] as any;
                switch (schema.type) {
                  case "array":
                    prev[propName] = JSON.stringify(rawValue);
                    return prev;

                  case "boolean":
                    prev[propName] = rawValue ? "✓" : "✕";
                    return prev;

                  case "integer":
                    prev[propName] = `${rawValue}`;
                    return prev;

                  case "number":
                    prev[propName] = formatMoney(rawValue || 0);
                    return prev;

                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  case "string":
                    if (schema.format === "date" && rawValue) {
                      prev[propName] =
                        (rawValue as string) === "2999-12-31"
                          ? "-"
                          : localeFormat(new Date(rawValue), "dd-MM-yyyy");
                      return prev;
                    }
                    if (schema.format === "date-time" && rawValue) {
                      prev[propName] = localeFormat(
                        new Date(rawValue),
                        "dd-MM-yyyy HH:mm"
                      );
                      return prev;
                    }
                    if (schema.enum) {
                      prev[propName] = _.startCase(rawValue);
                      return prev;
                    }
                  // fallthrough

                  default:
                    prev[propName] = rawValue ? `${rawValue}` : "";
                    return prev;
                }
              },
              { _index: rowIndex }
            )
          )
        : undefined
    );
  }, [columnNames, config, properties, sortedData]);

  const filteredRenderData = React.useMemo(() => {
    let result = renderData;
    if (!result) {
      return result;
    }
    if (searchQuery) {
      const lcQuery = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          !!columnNames.find((columnName) =>
            `${item[columnName]}`.toLowerCase().includes(lcQuery)
          )
      );
    }
    return result;
  }, [columnNames, renderData, searchQuery]);

  const Th = React.useCallback(
    (index: number) => {
      const propName = columnNames[index];
      const schema = properties[propName] as SchemaObject;
      const propConfig = config ? config[propName] : undefined;
      const thDivProps = {
        key: propName,
        style,
        className: `p-1 `,
      };
      if (!schema) {
        return <div {...thDivProps} />;
      }
      switch (schema.type) {
        case "boolean":
          thDivProps.className += " text-center";
          break;
        case "integer":
        case "number":
          thDivProps.className += " text-center";
          break;
        case "string":
          if (
            schema.format &&
            ["date", "date-time"].indexOf(schema.format) >= 0
          ) {
            thDivProps.className += " text-end";
          } else thDivProps.className += " text-start";
      }

      return (
        <TableCell {...thDivProps} sortDirection={false}>
          {propConfig?.title || _.startCase(propName)}
        </TableCell>
      );
    },
    [columnNames, properties, config, style]
  );

  const onTdClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onRowClick || !sortedData) {
        return;
      }
      const { rowIndex } = e.currentTarget.dataset;
      if (!rowIndex) {
        return;
      }
      if (filteredRenderData) {
        const row = filteredRenderData[parseInt(rowIndex, 10)];
        onRowClick(sortedData[row._index], row._index, e);
        setRowClicked(parseInt(rowIndex, 10));
      }
    },
    [filteredRenderData, onRowClick, sortedData]
  );

  const Td = React.useCallback(
    (rowIndex: number, columnIndex: number): React.ReactElement | null => {
      if (!filteredRenderData) {
        return null;
      }
      const propName = columnNames[columnIndex];
      const propConfig = config ? config[propName] : undefined;
      const row = filteredRenderData[rowIndex];
      const schema = properties[propName] as SchemaObject;
      const tdDivProps = {
        "data-row-index": rowIndex,
        "data-column-index": columnIndex,
        key: propName,
        style,
        onClick: onTdClick,
        className: `schema-table__td schema-table__td${
          rowClicked === rowIndex
            ? "--click"
            : rowIndex % 2
            ? "--odd"
            : "--even"
        } ${row && rowClassName ? rowClassName(sortedData[row._index]) : ""}`,
      };

      if (propConfig?.renderCell && sortedData) {
        return (
          <TableCell {...tdDivProps}>
            {propConfig.renderCell(sortedData[row._index], rowIndex)}
          </TableCell>
        );
      }

      if (!schema) {
        return null;
      }

      switch (schema.type) {
        case "boolean":
          tdDivProps.className += " text-center";
          break;
        case "number":
        case "integer":
          tdDivProps.className += " text-end";
          break;

        case "string":
          if (schema.format === "date" || schema.format === "date-time") {
            tdDivProps.className += " text-end";
          }
      }
      return <TableCell {...tdDivProps}>{row[propName]}</TableCell>;
    },
    [
      filteredRenderData,
      columnNames,
      config,
      properties,
      style,
      onTdClick,
      rowClicked,
      rowClassName,
      sortedData,
    ]
  );

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const src = e.currentTarget.value;
      setSearchQuery(src);
    },
    []
  );

  const convertDataToCsv = React.useCallback(() => {
    if (filteredRenderData) {
      const includedHeaders = Object.keys(
        schema.properties as Record<string, T>
      ).reduce((values, value) => {
        return !(config && config[value]) ||
          (config && config[value] && !config[value].excludeOnExport)
          ? [...values, value]
          : values;
      }, [] as string[]);
      return [
        includedHeaders.join(";"),
        ...filteredRenderData.map((value) =>
          includedHeaders.map((val) => JSON.stringify(value[val])).join(";")
        ),
      ].join("\r\n");
    }
  }, [config, filteredRenderData, schema.properties]);

  const exportToFile = React.useCallback(
    (text: string) => {
      const blob = new Blob([text], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download =
        location.pathname.substring(1).replaceAll("/", "_") + ".csv";
      link.href = url;
      link.click();
    },
    [location.pathname]
  );

  return (
    <TableContainer>
      <div className="d-flex mb-2 justify-content-between">
        {isSearchable ? (
          <input
            className={"search-input my-0 shadow-none"}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={onSearchChange}
            autoFocus
          />
        ) : null}
        {isExportable ? (
          <button
            className="btn btn-primary my-0"
            onClick={() => {
              const csv = convertDataToCsv();
              exportToFile(csv as string);
            }}
          >
            export
          </button>
        ) : null}{" "}
      </div>

      <Table
        sx={{ minWidth: 750 }}
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <TableHead>
          <TableRow>{columnNames.map((clm, idx) => Th(idx))}</TableRow>
        </TableHead>

        {sortedData ? (
          <TableBody>
            {filteredRenderData?.map((data, rowIndex: number) => {
              return (
                <TableRow hover tabIndex={-1} key={`tr-${rowIndex}`}>
                  {columnNames.map((clm, columnIndex: number) =>
                    Td(rowIndex, columnIndex)
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <CircularProgress />
        )}
      </Table>
    </TableContainer>
  );
}
