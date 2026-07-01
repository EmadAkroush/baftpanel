export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { public: { apiBase } } = useRuntimeConfig()

  // 🟢 گرفتن توکن از کوکی




  try {
    // 🟢 ارسال درخواست به بک‌اند finalxcard با توکن
    const data = await $fetch(`${apiBase}/products`, {
      method: 'POST',
      headers: {
        'Accept': 'Multipart/Form-Data',

      },
      body,
    })


  
    

    return data
  } catch (error) {
    console.error('❌ Investment API Error:', error?.data || error)

    // اگر خطای توکن یا دسترسی بود، کوکی پاک بشه
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      setCookie(event, 'token', '', { maxAge: 0, path: '/' })
    }

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.data?.message || 'Investment request failed',
    })
  }
})
