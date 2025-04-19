import axios from "axios";

export async function getUserSymfony(userId: any) {
  try {
    const { data } = await axios.get(
      `${process.env.SYMFONY_URL}api/users/${userId}`
    );
    console.log("User data from Symfony:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch users, nilefa izy:", error);
    return null
  }
}
