export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();


  const query = getQuery(event);

 
  try {
    // 🟢 ارسال درخواست به بک‌اند finalxcard با توکن
    const data = await $fetch(`${apiBase}/products/?page=${query.page}`, {
      method: "GET",
      headers: {},
    });


    return data;
  } catch (error) {
    console.error("❌ Investment API Error:", error?.data || error);

    // اگر خطای توکن یا دسترسی بود، کوکی پاک بشه
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      setCookie(event, "token", "", { maxAge: 0, path: "/" });
    }

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.data?.message || "Investment request failed",
    });
  }
});
