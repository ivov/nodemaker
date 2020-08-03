/**
 * Node generation may be:
 * - Simple: Output node with resource operations and fields in a single file.
 * - Complex: Output node with resource operations and fields in separate files.
 */
export enum NodeGenerationEnum {
  Simple = "Simple",
  Complex = "Complex",
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

/**
 * A node documentation file may be:
 * - Main: The node functionality documentation file to be placed at docs/nodes/nodes-library/nodes at the n8n-docs repo.
 * - Credentials: The node credentials documentation file to be placed at docs/nodes/credentials at the n8n-docs repo.
 */
export enum NodeDocFileEnum {
  main,
  credential,
}
