import axios from "axios";

const IncreaseCountDb = async (email: string | undefined) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/user/increasecount`,
      {
        email: email,
      }
    );
    return response.data;
  } catch (err: any) {
    console.log("Error while increasing count in DB", err);
  }
};

const increaseGenCountDb = async (email: string | undefined) => {
  const res = await IncreaseCountDb(email);
  return res;
};

export default increaseGenCountDb;
