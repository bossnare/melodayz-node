import getPublicKey from "@/utils/key.get.js";
import jwt from "jsonwebtoken";

// const jwtPublic: string = process.env.JWT_PUBLIC_KEY!; // mila an'io raha misaraka front-back... raha alaina amin'ny .env
const jwtPublic = getPublicKey() // mampiasa helper
// const jwtPublic = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'); // raha mila manova ny endriky ny key avy any amin'ny react
//avy any amin'ny symfony

if (!jwtPublic) throw new Error("JWT_PUBLIC est manquant dans le fichier .env");

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeaders = req.headers.authorization; // avy any amin'ny react
  if (!authHeaders)
    return res.status(403).send({ message: "Aucun token fourni!", recomm: "Connectez-vous!" }); // 403 Forbidden

  const token = authHeaders.split(" ")[1]; // "Bearer token" no endriny, ka mila esorina ny "Bearer" sy ny "token

  try {
    const decoded = jwt.verify(token, jwtPublic, {
      algorithms: ["RS256"],
    });
    req.user = decoded; // raha mila ny user id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide!" }); // 401 Unauthorized
  }
};

export default verifyJWT;
