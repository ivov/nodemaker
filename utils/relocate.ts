import fs from "fs";
import { promisify } from "util";

const relocate = promisify(fs.rename);

export default relocate;
