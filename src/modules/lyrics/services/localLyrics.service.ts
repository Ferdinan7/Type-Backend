type SongQuote = {
  quote: string;
  artist: string;
  song: string;
};

const LYRICS_DB: Record<string, SongQuote[]> = {
  kpop: [
    { quote: "I’m the one I should love in this world", artist: "BTS", song: "Epiphany" },
    { quote: "Not shy, not me", artist: "ITZY", song: "Not Shy" },
    { quote: "Tell me what you want, tell me what you need", artist: "NewJeans", song: "Super Shy" },
    { quote: "Like a thunder, like a fire", artist: "TXT", song: "0X1=LOVESONG" },
    { quote: "I bring the pain like", artist: "BLACKPINK", song: "Pink Venom" },
  ],
  pop: [
    { quote: "I'm walking on sunshine", artist: "Katrina & The Waves", song: "Walking on Sunshine" },
    { quote: "Don't stop believin'", artist: "Journey", song: "Don't Stop Believin'" },
    { quote: "I got the eye of the tiger, a fighter", artist: "Katy Perry", song: "Roar" },
    { quote: "I will survive, oh as long as I know how to love", artist: "Gloria Gaynor", song: "I Will Survive" },
    { quote: "Cause baby you're a firework", artist: "Katy Perry", song: "Firework" },
  ],
};

export const getRandomLocalLyric = (genre: string = "pop"): SongQuote & { genre: string } => {
  const pool = LYRICS_DB[genre.toLowerCase()] ?? LYRICS_DB.pop;
  const selected = pool[Math.floor(Math.random() * pool.length)];

  return { ...selected, genre};
}
