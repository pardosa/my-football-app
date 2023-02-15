import { ReferenceObject, SchemaObject } from "openapi3-ts";
import openapi from "../openapi.json";

export function getEmptyObject<T>(schema: SchemaObject): T {
  const { properties = {}, required = [] } = schema;
  return Object.keys(properties).reduce((prev, propName) => {
    const prop = properties[propName] as SchemaObject;
    if (required.indexOf(propName) === -1) {
      return prev;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let propValue: any;
    switch (prop.type) {
      case "string":
        propValue =
          prop.format === "date" || prop.format === "date-time"
            ? new Date().toISOString()
            : prop.default || "";
        break;

      case "array":
        propValue = prop.default || [];
        break;

      case "number":
      case "integer":
        propValue = prop.default || 0;
        break;

      case "boolean":
        propValue = prop.default || false;
        break;

      case "object":
        propValue = prop.default || getEmptyObject(prop);
        break;

      // eslint-disable-next-line no-fallthrough
      default:
        console.log(prop);
        throw new Error("Unsupported property");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prev[propName] = propValue;
    return prev;
  }, {}) as T;
}

function resolve(schema: SchemaObject | ReferenceObject): SchemaObject {
  const { items, properties, $ref } = schema as SchemaObject & ReferenceObject;
  if ($ref) {
    // e.g. #/components/schemas/Role
    const path = $ref.substring(2).split("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = openapi;
    let pointer = path.shift();
    while (pointer) {
      result = result[pointer];
      pointer = path.shift();
    }
    return resolve(result);
  }
  if (items) {
    return {
      ...schema,
      items: resolve(items),
    };
  }
  if (properties) {
    return {
      ...schema,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      properties: Object.keys(properties).reduce<any>((prev, propName) => {
        prev[propName] = resolve(properties[propName]);
        return prev;
      }, {}),
    };
  }
  return schema as SchemaObject;
}

export interface IToast {
  show: boolean;
  title?: string;
  body?: string;
  variant?: string;
}

const resolvedOpenApi = {
  ...openapi,
  components: {
    ...openapi.components,
    schemas: Object.entries(openapi.components.schemas).reduce<{
      [schema: string]: SchemaObject;
    }>((prev, [schemaName, schema]) => {
      prev[schemaName] = resolve(schema as SchemaObject);
      return prev;
    }, {}),
  },
};

export default resolvedOpenApi;
