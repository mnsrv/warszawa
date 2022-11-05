import { Suspense } from "react";
import Letterboxd, { LetterboxdSkeleton } from "./Letterboxd";

export const revalidate = 60; // revalidate this page every 60 seconds

export default function Page() {
  return (
    <>
      <main>
        <section>
          <h1>Welcome to Playground</h1>
        </section>
        <Suspense fallback={<LetterboxdSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <Letterboxd />
        </Suspense>
      </main>
    </>
  );
}
