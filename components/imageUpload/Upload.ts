import axios from "axios";
type Props = {
  image: any;
  email: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormData = global.FormData;

export const imageUploader = async ({ image, email, setIsLoading }: Props) => {
  let data = new FormData();

  try {
    setIsLoading(true);
    const filename = image.split("/").pop();
    data.append("filename", "addedPhoto");
    data.append("email", email);
    // @ts-ignore
    data.append("addedPhoto", {
      uri: image,
      name: filename,
      type: "image/jpg`",
    });

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/upload/uploadphoto`,
      data,
      config
    );

    if (response) {
      setIsLoading(false);
      return response.data;
    }
  } catch (err: any) {
    setIsLoading(false);
    console.log("Error uploading image to backend", err);
    alert(err);
  }
};
