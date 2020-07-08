type MetaParameters = {
  serviceName: string;
  auth: "OAuth2" | "Key" | "";
  nodeColor: string;
  apiUrl: string;
};

type MainParameters = { [key: string]: Resource };

type Resource = Operation[];

type Operation = {
  name: string;
  description: string;
  endpoint: string;
  requestMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  fields: OperationField[];
};

type OperationField = {
  name: string;
  description?: string; // only optional for if name is "Additional Fields" → TODO: how to enforce this?
  type: FieldType;
  default: FieldDefault;
  options?: FieldOption[];
  extraDisplayRestriction?: { [key: string]: boolean };
};

type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "collection"
  | "fixedCollection"
  | "options"
  | "multiOptions";

type FieldDefault = string | number | boolean | {};

type FieldOption = {
  name: string;
  description: string;
  type: FieldType;
  default: FieldDefault;
  options?: MiniFieldOption[];
};

type MiniFieldOption = {
  name: string;
  description: string;
};
