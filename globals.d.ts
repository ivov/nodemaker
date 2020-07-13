// ----------------------------------
//         Node generation
// ----------------------------------

/**
 * Node generation can be:
 - Simple: Output node with resource operations and fields in a single file.
 - Complex: Output node with resource operations and fields in separate files.
*/
type NodeGenerationType = "simple" | "complex";

// ----------------------------------
//         Meta parameters
// ----------------------------------

type MetaParameters = {
  serviceName: string;
  auth: Auth;
  nodeColor: string;
  apiUrl: string;
};

type Auth = "OAuth2" | "Key" | "";

// ----------------------------------
//         Docs parameters
// ----------------------------------

type DocsParameters = {
  serviceName: string;
  serviceUrl: string;
  introDescription: string;
  exampleUsage: string;
  workflowNumber: string;
};

// ----------------------------------
//         Main parameters
// ----------------------------------

type MainParameters = { [key: string]: Resource };

type Resource = Operation[];

type Operation = {
  name: string;
  description: string;
  endpoint: string;
  requestMethod: RequestMethod;
  fields: OperationField[];
};

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type OperationField = SingleValueOperationField | ManyValuesGroupField;

type SingleValueOperationField = {
  name: string;
  description: string;
  type: SingleValueFieldType;
  default: SingleValueFieldDefault;
  extraDisplayRestriction?: { [key: string]: boolean };
};

type ManyValuesGroupField = {
  name: string;
  type: ManyValuesFieldType;
  default: ManyValuesFieldDefault;
  options: FieldOption[];
  extraDisplayRestriction?: { [key: string]: boolean };
};

type FieldType = SingleValueFieldType | ManyValuesFieldType;

type SingleValueFieldType = "string" | "number" | "boolean";

type ManyValuesFieldType =
  | "collection"
  | "fixedCollection"
  | "options"
  | "multiOptions";

type FieldDefault = SingleValueFieldDefault | ManyValuesFieldDefault;

type SingleValueFieldDefault = string | number | boolean;

type ManyValuesFieldDefault = {};

type FieldOption = {
  name: string;
  description: string;
  type: FieldType;
  default: FieldDefault;
  options?: MaxNestedFieldOption[];
};

type MaxNestedFieldOption = {
  name: string;
  description: string;
};
