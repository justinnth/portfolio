import { currentUser } from "@clerk/nextjs";

import { db } from "@db/db";
import { portfolios } from "@db/schema";

export const CreatePortfolioForm = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const user = await currentUser();
    const portfolioName = formData.get("name")?.toString();

    try {
      if (portfolioName && user?.id) {
        await db
          .insert(portfolios)
          .values({ name: portfolioName, userId: user.id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" id="name" />
      <button type="submit">Submit</button>
    </form>
  );
};
