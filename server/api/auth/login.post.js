export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  console.log("dfsfsfs");
  
  try {
    // 🔹 ارسال درخواست لاگین به بک‌اند
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      credentials: "include",
      body,
      headers: {
        Accept: "application/json",
      },
    });
    console.log("data $ " , data);
   
    // 🔥🔥 فقط ادمین اجازه ورود دارد
    if (!data.user || data.user.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Access denied. Admins only.",
      });
    }

    // 🔹 ست کردن کوکی‌ها فقط اگر نقش درست بود
    setCookie(event, "accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    setCookie(event, "refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return data;
  } catch (error) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || "Login failed",
    });
  }
});
