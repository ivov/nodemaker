export const areTriggerNodeParameters = (
  params: MainParameters
): params is TriggerNodeParameters =>
  (params as TriggerNodeParameters).webhookProperties !== undefined;
