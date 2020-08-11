/**
 * Node generation may be:
 * - Simple: Output node with resource operations and fields in a single file.
 * - Complex: Output node with resource operations and fields in separate files.
 */
export enum NodeGenerationEnum {
  Simple = "Simple",
  Complex = "Complex",
}

/**
 * Node type may be:
 * - Regular: Called when the workflow is executed.
 * - Trigger: Called when the workflow is activated.
 */
export enum NodeTypeEnum {
  Regular = "Regular",
  Trigger = "Trigger",
}

/**API auth may be:
 * - OAuth2: Various OAuth2 parameters required.
 * - Api Key: Usually a token string credential.
 * - None: No credential needed.
 */
export enum AuthEnum {
  OAuth2 = "OAuth2",
  ApiKey = "API Key",
  None = "None",
}
