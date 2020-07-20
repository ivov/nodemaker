export enum NodeDocFile {
  main,
  credential,
}

/**
 * Node generation can be:
 - Simple: Output node with resource operations and fields in a single file.
 - Complex: Output node with resource operations and fields in separate files.
*/
export enum NodeGenerationType {
  simple,
  complex,
}
