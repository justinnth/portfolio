import { CreatePositionForm } from "@components/organisms/CreatePositionForm";

export default async function CreatePosition({
  params,
}: {
  params: { id: number };
}) {
  return (
    <main>
      <CreatePositionForm portfolioId={params.id} />
    </main>
  );
}
