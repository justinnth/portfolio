import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <Link href="/portfolio/create">Créer mon portfolio</Link>
    </main>
  );
}
