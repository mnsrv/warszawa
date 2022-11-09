import Letterboxd from "./Letterboxd";
import Lichess from "./Lichess";

export const revalidate = 60; // revalidate this page every 60 seconds

export default function Page() {
  return (
    <>
      <main>
        <section>
          <h1>Welcome to Playground</h1>
        </section>
        {/* @ts-expect-error Server Component */}
        <Letterboxd />
        {/* @ts-expect-error Server Component */}
        <Lichess />
      </main>
    </>
  );
}
