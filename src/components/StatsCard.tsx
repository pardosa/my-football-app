import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { SchemaObject } from "openapi3-ts";
import { getEmptyObject, capitalize } from "../types/schema";

interface IFieldConfig {
  extractValue?: (e: React.ChangeEvent<any>) => any;
  hidden?: boolean;
  renderRow?: () => React.ReactElement | null;
}

interface ISchemaProps<T> {
  schema: SchemaObject;
  config?: {
    [propertyName: string]: IFieldConfig;
  };
  value?: T;
  title?: string;
}

export default function StatsCard<T>(props: ISchemaProps<T>) {
  const { config = {}, schema, title } = props;
  const { properties = {} } = schema;
  const value: T = props.value ? props.value : getEmptyObject(schema);
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        {Object.keys(properties).map((propertyName, index) => {
          const propertySchema = (
            schema.properties ? schema.properties[propertyName] : {}
          ) as SchemaObject;
          const propertyConfig = config[propertyName] || {};

          if (propertySchema.readOnly || propertyConfig.hidden) {
            return null;
          }

          const propertyValue = (value as any)[propertyName];
          return propertyName !== "id" ? (
            <Stack direction={"row"} spacing={2} alignItems="space-between">
              <Typography variant="body2" sx={{ minWidth: "100px" }}>
                {capitalize(propertyName)}
              </Typography>
              {propertyName === "logo" ||
              propertyName === "flag" ||
              propertyName === "image" ? (
                <Avatar
                  sx={{ width: "30px", height: "30px", mr: 1 }}
                  aria-label="logo"
                  src={propertyValue}
                />
              ) : (
                <Typography variant="subtitle1">{propertyValue}</Typography>
              )}
            </Stack>
          ) : null;
        })}
      </CardContent>
    </Card>
  );
}
