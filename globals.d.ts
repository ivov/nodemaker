// ********************************************************************
//                         Env vars-related
// ********************************************************************

declare namespace NodeJS {
  export interface ProcessEnv {
    GOOGLE_IMAGE_SEARCH_ENGINE_ID: string;
    GOOGLE_PROJECT_API_KEY: string;
    N8N_LOGIN_USERNAME: string;
    N8N_LOGIN_PASSWORD: string;
    IMGBB_API_KEY: string;
  }
}

// ********************************************************************
//                         Interface-related
// ********************************************************************

type RequesterInputType =
  | string
  | NodegenParamsBundle
  | DocsgenParamsBundle
  | PlacementChannelArgument
  | PackgenChannelArgument
  | EmptyChannelArgument;

// TODO - Refactor once UI is finished
// prettier-ignore
type RequesterOutputType<T> =
    T extends string ? string :
    T extends NodegenParamsBundle ? BackendOperationResult :
    T extends DocsgenParamsBundle ? BackendOperationResult :
    T extends PlacementChannelArgument ? BackendOperationResult :
    T extends PackgenChannelArgument ? BackendOperationResult :
    T extends EmptyChannelArgument ? BackendOperationResult :
    never;

type BackendOperationResult =
  | { completed: true }
  | { completed: false; error: any };

type PlacementChannelArgument = {
  filesToPlace: "functionality" | "documentation";
};

type PackgenChannelArgument = MetaParameters;

type EmptyChannelArgument = void;

// ********************************************************************
//                         CLI-related
// ********************************************************************

type HighlighterArgument = {
  result: BackendOperationResult;
  successMessage: string;
  inspectMessage?: boolean;
};

// ********************************************************************
//                         Bundle-related
// ********************************************************************

type NodegenParamsBundle = {
  metaParameters: MetaParameters;
  mainParameters: MainParameters;
  nodeGenerationType: NodeGenerationType;
  nodeType: NodeType;
};

type NodeGenerationType = "Simple" | "Complex";

type NodeType = "Regular" | "Trigger";

type DocsgenParamsBundle = {
  metaParameters: MetaParameters;
  mainParameters: MainParameters;
  docsParameters: DocsParameters;
};

type IconCandidate = "1" | "2" | "3" | "4" | "5";

// ********************************************************************
//                         Parameters-related
// ********************************************************************

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
  workflowUrl: string;
};

// ----------------------------------
//         Main parameters
// ----------------------------------

type MainParameters = RegularNodeParameters | TriggerNodeParameters;

// ----------------------------------
//      Trigger node parameters
// ----------------------------------

type TriggerNodeParameters = {
  webhookEndpoint: string;
  webhookProperties: WebhookProperty[];
};

type WebhookProperty = {
  displayName: string;
  name: string;
  required: boolean;
  description: string;
  type: SingleValueFieldType | CollectionType | OptionsType;
  default: FieldDefault;
  options?: WebhookPropertyOption[]; // only for `type: OptionsType`
};

type WebhookPropertyOption = {
  name: string;
  description: string;
  value: string;
  fields?: WebhookPropertyOptionField[]; // only for `type: OptionsType` in `WebhookProperty`
};

type WebhookPropertyOptionField = OperationField & {
  displayName: string;
  required: boolean;
};

// ----------------------------------
//      Regular node parameters
// ----------------------------------

type RegularNodeParameters = { [key: string]: Resource };

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
  numericalLimits?: { minLimit: number; maxLimit: number }; // for `type: number` only
};

type ManyValuesGroupField = {
  name: string;
  description: string;
  type: CollectionType | OptionsType;
  default: ManyValuesFieldDefault;
  options: ManyValuesGroupFieldOption[];
  extraDisplayRestriction?: { [key: string]: boolean };
};

type SingleValueFieldType = "string" | "number" | "boolean";

type OptionsType = "options" | "multiOptions";

type CollectionType = "collection" | "fixedCollection";

type FieldType = SingleValueFieldType | OptionsType | CollectionType;

type FieldDefault = SingleValueFieldDefault | ManyValuesFieldDefault;

type SingleValueFieldDefault = string | number | boolean;

type ManyValuesFieldDefault = {};

type ManyValuesGroupFieldOption = {
  name: string;
  description: string;
  type: SingleValueFieldType | OptionsType;
  default: FieldDefault;
  options?: MaxNestedFieldOption[];
};

type MaxNestedFieldOption = {
  name: string;
  description: string;
};

type OptionWithMaxNesting = ManyValuesGroupFieldOption & {
  options: MaxNestedFieldOption[];
}; // only used for type guard


// ********************************************************************
//                        Frontend Types
// ********************************************************************
type FrontendNodeType = NodeType | "";

type BasicInfo = MetaParameters & {
  webhookEndpoint: string;
};

type BasicInfoState = {
  basicInfo: BasicInfo;
  nodeType: FrontendNodeType;
  documentation: boolean;
};

type DocsInfoState = {
  docsInfo: DocsParameters;
};

type FrontendResource = FrontendAdditionalProps & {
  text: string;
};

type ResourcesState = {
  resources: FrontendResource[];
};

type FrontendOperation = Operation & FrontendAdditionalProps & {
  resource: string;
};

type OperationsState = {
  operations: FrontendOperation[];
};

type AssociatedProps = FrontendAdditionalProps & {
  value: string;
};

type FrontendRegularField = OperationField & FrontendAdditionalProps & {
  resourceOperation: AssociatedProps[];
  options: FrontendOption[];
  displayRestrictions: string;
  min?: string;
  max?: string;
};

type FrontendTriggerField = WebhookPropertyOptionField & FrontendAdditionalProps & {
  resourceOperation: AssociatedProps[];
  options: FrontendOption[];
};

type FrontendField = FrontendRegularField | FrontendTriggerField;

type FrontendProperty = WebhookProperty & FrontendAdditionalProps & {
  resource: string;
};

type PropertyState = {
  properties: FrontendProperty[];
};

type OptionsOption = MaxNestedFieldOption & FrontendAdditionalProps;

type CollectionOption = ManyValuesGroupFieldOption & FrontendAdditionalProps;

type FrontendOption = CollectionOption | OptionsOption;

type FieldsState = {
  fields: FrontendField[];
};

type FrontendAdditionalProps = {
  key: number;
  add?: boolean;
  cancel?: boolean;
};

type MainParametersBuilder = MainParameters & { 
  [key: string]: any; 
};
