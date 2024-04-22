import axios from "axios";

const createUserRecord = async (email: string | undefined) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/user/createuser`,
      {
        email: email,
      }
    );
    return response.data;
  } catch (err: any) {
    return;
  }
};

export default createUserRecord;
