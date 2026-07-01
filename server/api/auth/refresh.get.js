
export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const refreshToken = getCookie(event, 'refreshToken');
   
    try {
        const data = await $fetch(`${apiBase}/auth/refresh`, {
            credentials: 'include', // 🔥 بدون این، کوکی‌ها منتقل نمی‌شن
            headers: {
                'Accept': 'application/json',
                'Authorization': refreshToken
            }
        })



    setCookie(event, "accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // ❗ حتما lax بزن نه none
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    setCookie(event, "refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // ❗ حتما lax بزن نه none
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });






  

        return data;
    } catch (error) {
        console.log("========== REFRESH TOKEN ERROR ==========");
        console.log(error.data);
        console.log(error.response?._data);
        console.log(error);
        throw error;
        
        if(error.statusCode == 401) {
            setCookie(event, 'refreshToken', '', {
                httpOnly: true,
                secure: true,
                maxAge: new Date(0),
                path: '/'
            })
        }

        return error
    }
})