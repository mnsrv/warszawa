import Parser from "rss-parser";

import styles from "./Letterboxd.module.css";

type CustomFeed = {};
type CustomItem = {
  creator: string; // "Sasha Mansurov";
  title: string; // "Rogue One: A Star Wars Story, 2016 - ★★★";
  link: string; // "https://letterboxd.com/mansurov/film/rogue-one-a-star-wars-story/1/";
  pubDate: string; // "Mon, 31 Oct 2022 04:04:56 +1300";
  "dc:creator": string; // "Sasha Mansurov";
  content: string; // ' <p><img src="https://a.ltrbxd.com/resized/film-poster/2/5/8/1/2/8/258128-rogue-one-a-star-wars-story-0-600-0-900-crop.jpg?v=eff30d0282"/></p> <p>посмотрели для Андора</p> ';
  contentSnippet: string; // "посмотрели для Андора";
  guid: string; // "letterboxd-review-309557823";
  isoDate: string; // "2022-10-30T15:04:56.000Z";
  "letterboxd:watchedDate": string; // 2022-10-29
  "letterboxd:rewatch": string; // Yes
  "letterboxd:filmTitle": string; // Rogue One: A Star Wars Story
  "letterboxd:filmYear": string; // 2016
  "letterboxd:memberRating": string; // 3.0
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    item: [
      "letterboxd:watchedDate",
      "letterboxd:rewatch",
      "letterboxd:filmTitle",
      "letterboxd:filmYear",
      "letterboxd:memberRating",
    ],
  },
});

async function getData() {
  const res = await parser.parseURL("https://letterboxd.com/mansurov/rss/");
  return res.items.slice(0, 3);
}

export default async function Letterboxd() {
  const movies = await getData();

  return (
    <section>
      <h2>Movies</h2>
      <div className={styles.list}>
        {movies.map((m) => (
          <div
            key={m.guid}
            dangerouslySetInnerHTML={{ __html: m.content }}
            className={styles.letterboxd}
          />
        ))}
      </div>
    </section>
  );
}

export function LetterboxdSkeleton() {
  return (
    <section>
      <h2>Movies</h2>
      <div className={styles.list}>
        {[0, 1, 2].map((m) => (
          <div key={m} className={styles.letterboxd}>
            <p>
              <span className={styles.poster} />
            </p>
            <p>loading...</p>
          </div>
        ))}
      </div>
    </section>
  );
}
