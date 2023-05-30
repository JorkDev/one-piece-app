const baseUrl = "https://api.jikan.moe/v4/anime?q=";
const animeTitles = [
  "Cowboy Bebop",
  "Trigun",
  "Witch Hunter Robin",
  "Naruto",
  "Sunabouzu",
  "Texhnolyze",
  "Trinity Blood",
  "Zipang",
  "Neon Genesis Evangelion",
  "Koukaku Kidoutai",
];

const animeData = animeTitles.reduce((acc, title) => {
  acc[`fetch${title.replace(/\s/g, "")}`] = {
    title,
    url: `${baseUrl}${encodeURIComponent(title)}&limit=1`,
  };
  return acc;
}, {});

export default animeData;
