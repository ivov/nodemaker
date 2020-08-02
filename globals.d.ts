// **********************************
//         Env vars-related
// **********************************

declare namespace NodeJS {
  export interface ProcessEnv {
    GOOGLE_IMAGE_SEARCH_ENGINE_ID: string;
    GOOGLE_PROJECT_API_KEY: string;
    N8N_LOGIN_USERNAME: string;
    N8N_LOGIN_PASSWORD: string;
  }
}

// **********************************
//         Channel-related
// **********************************

type NodemakerResult = {
  success: boolean;
};

type ParamsBundle = {
  metaParameters: MetaParameters;
  mainParameters: MainParameters;
  nodeGenerationType: NodeGenerationType;
};

type NodeGenerationType = "Simple" | "Complex";

// **********************************
//         Params-related
// **********************************

type NodemakerParameters = MetaParameters | MainParameters | DocsParameters;

// ----------------------------------
//         Meta parameters
// ----------------------------------

type MetaParameters = {
  serviceName: string;
  authType: AuthType;
  nodeColor: string;
  apiUrl: string;
};

type AuthType = "OAuth2" | "API Key" | "None";

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
