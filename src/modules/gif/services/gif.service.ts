import axios from "axios";

const GIPHY_API_KEY = process.env.GIPHY_API_KEY!;
const GYPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search";

// 🎉 Tags normales
const GENERAL_TAGS = [
  "celebration",
  "cheering",
  "excited",
  "clapping",
  "party",
  "yay",
  "applause",
  "bravo"
];

// 🎶 Tags de K-pop con tema celebración
const KPOP_TAGS = [
  "kpop celebration",
  "kpop clapping",
  "kpop stage",
  "kpop cheering",
  "kpop happy",
  "kpop dance"
];

function getRandomTag() {
  const useKpop = Math.random() < 0.5;
  const source = useKpop ? KPOP_TAGS : GENERAL_TAGS;
  const tag = source[Math.floor(Math.random() * source.length)];
  return tag;
}

export const getGifs = async () => {
  const randomTag = getRandomTag();

  const response = await axios.get(GYPHY_BASE_URL, {
    params: {
      api_key: GIPHY_API_KEY,
      q: randomTag,
      limit: 10,
      rating: "g",
    }
  })

  const gifs = response.data.data;

  if (!gifs.length) return null;

  // Seleccionar un GIF al azar
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex]?.images?.downsized_medium?.url;
}
