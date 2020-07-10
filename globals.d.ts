// ----------------------------------
//         Node generation
// ----------------------------------

/**
 - Simple: A node containing resources, operations and fields inside a single file.
 - Complex: A node divided into separate files for each of their resource operations and fields.
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
//         Main parameters
// ----------------------------------

type MainParameters = { [key: string]: Resource };

type Resource = Operation[];

type Operation = {
  name: string;
  description: string;
  endpoint: string;
  requestMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  fields: OperationField[];
};

// operation field

type OperationField = OperationRegularField | OperationGroupField;

type OperationRegularField = {
  name: string;
  description: string;
  type: SimpleFieldType;
  default: RegularFieldDefault;
  options?: FieldOption[];
  extraDisplayRestriction?: { [key: string]: boolean };
};

type OperationGroupField = {
  name: string;
  type: GroupFieldType;
  default: GroupFieldDefault;
  options?: FieldOption[];
  extraDisplayRestriction?: { [key: string]: boolean };
};

// field type

type FieldType = SimpleFieldType | GroupFieldType;

type SimpleFieldType = "string" | "number" | "boolean";

type GroupFieldType =
  | "collection"
  | "fixedCollection"
  | "options"
  | "multiOptions";

// field default

type FieldDefault = RegularFieldDefault | GroupFieldDefault;

type RegularFieldDefault = string | number | boolean;

type GroupFieldDefault = {};

// field option

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
