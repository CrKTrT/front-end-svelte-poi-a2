export const load =
  async ({ cookies }) => {

    cookies.delete(
      "playtime-user",
      {
        path: "/"
      }
    );

};