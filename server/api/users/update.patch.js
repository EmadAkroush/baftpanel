export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  // const token = getCookie(event, 'token');
  const query = getQuery(event);

  // 🟢 گرفتن توکن از کوکی
  const accessToken = getCookie(event, "accessToken");

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Token missing",
    });
  }

  console.log("ffff" , query.id );

  try {
    const data = await $fetch(`${apiBase}/users/${query.id}`, {
      method: "Patch",
      body: body,
      headers: {
        Accept: "Multipart/Form-Data",
   
      },
    });
    console.log("edit", data);

    return data;
  } catch (error) {
    console.log("vvv", error);

    throw createError({
      statusCode: error.statusCode,
      statusMessage: JSON.stringify(error.data),
    });
  }
});
