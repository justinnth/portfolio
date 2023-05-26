import { CreatePositionForm } from "@components/organisms/CreatePositionForm";

export default async function CreatePosition() {
  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <CreatePositionForm />
    </main>
  );
}
