type Perf = {
  games: number;
  rating: number;
  rd: number;
  prog: number;
  prov: boolean;
};
type Profile = {
  perfs: {
    blitz: Perf;
    rapid: Perf;
  };
};

async function getData(): Promise<Profile> {
  const headers = {
    Authorization: "Bearer " + process.env.LICHESS_API_TOKEN,
  };
  const res = await fetch("https://lichess.org/api/account", { headers });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data.error);
  }
}

export default async function Lichess() {
  const profile = await getData();

  return (
    <section>
      <h2>Lichess</h2>
      <p>⚡️ Blitz: {profile.perfs.blitz.rating}</p>
      <p>🐰 Rapid: {profile.perfs.rapid.rating}</p>
    </section>
  );
}
