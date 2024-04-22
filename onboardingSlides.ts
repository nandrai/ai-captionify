let DataTypes: {
  id: string;
  title: string;
  description: string;
  image: any;
}[];

export default DataTypes = [
  {
    id: "1",
    title: "Welcome to Ai Captionify",
    description:
      "Create captivating captions effortlessly for your photos with our AI-powered caption generator. Let's get started!",
    image: require("./assets/images/icon.png"),
  },
  {
    id: "2",
    title: "Choose a Photo",
    description:
      "Select a photo from your gallery to generate a personalized caption that enhances its impact",
    image: require("./assets/onBoardingAssets/gallery.png"),
  },
  {
    id: "3",
    title: "Personalize",
    description:
      "Select the ideal length, intended audience, mood & tone for your caption",
    image: require("./assets/onBoardingAssets/adjust.png"),
  },
  {
    id: "4",
    title: "Get your Perfect Caption",
    description:
      "Sit back and let our AI craft the perfect caption for your photo based on your preferences. Copy it and share it effortlessly on your favorite social media platforms!",
    image: require("./assets/onBoardingAssets/caption.png"),
  },
  {
    id: "5",
    title: "Ready to Share!",
    description:
      "Your caption is ready! Copy it and share your beautifully captioned photo with the world. Enjoy!",
    image: require("./assets/onBoardingAssets/start-up.png"),
  },
];
