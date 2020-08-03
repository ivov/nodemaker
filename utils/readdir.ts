import fs from "fs";
import { promisify } from "util";

const readdir = promisify(fs.readdir);

export default readdir;
