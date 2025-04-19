// satria mampiasa ESM dia nanao custom dirname helper

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPublicKey = () => {
  return fs.readFileSync(path.join(__dirname, "../jwt/public.pem"), "utf-8");
};

export default getPublicKey;
