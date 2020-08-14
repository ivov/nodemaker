export const areTriggerNodeParameters = (
  params: MainParameters
): params is TriggerNodeParameters =>
  (params as TriggerNodeParameters).webhookProperties !== undefined;

export const isManyValuesGroupField = (
  field: OperationField
): field is ManyValuesGroupField =>
  (field as ManyValuesGroupField).type === "options" ||
  (field as ManyValuesGroupField).type === "multiOptions" ||
  (field as ManyValuesGroupField).type === "collection" ||
  (field as ManyValuesGroupField).type === "fixedCollection";

export const isOptionWithMaxNesting = (
  option: ManyValuesGroupFieldOption
): option is OptionWithMaxNesting => option.options !== undefined;
