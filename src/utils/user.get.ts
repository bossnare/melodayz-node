//get user connected with id avy any amin'ny front-end
const getUser = (req: any) => {
  const user = req.user.id; // avy any amin'ny react
  if (!user) return null; // raha tsy misy token
  console.log(user);
  return user;
};

export default getUser;
