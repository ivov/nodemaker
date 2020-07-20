/**
 * A node documentation file may be:
 * - Main: The node functionality documentation file to be placed at docs/nodes/nodes-library/nodes at the n8n-docs repo.
 * - Credentials: The node credentials documentation file to be placed at docs/nodes/credentials at the n8n-docs repo.
 * */
export enum NodeDocFile {
  main,
  credential,
}

/**
 * Node generation may be:
 * - Simple: Output node with resource operations and fields in a single file.
 * - Complex: Output node with resource operations and fields in separate files.
 */
export enum NodeGenerationType {
  simple,
  complex,
}

/**Files to be placed may be:
 * - Node functionality files to be placed at n8n repo
 * - Node documentation files to be placed at n8n-docs repo.*/
export enum FilesToPlace {
  nodeFunctionalityFiles,
  nodeDocumentationFiles,
}
