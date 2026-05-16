export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  // 🟢 گرفتن توکن از کوکی
  const accessToken = getCookie(event, "accessToken");

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Token missing",
    });
  }

  try {
    // 🟢 ارسال درخواست به بک‌اند finalxcard با توکن
    const data = await $fetch(`${apiBase}/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
