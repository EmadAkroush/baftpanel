export default defineEventHandler(async (event) => {
    
    const { public: { apiBase } } = useRuntimeConfig();
    // const token = getCookie(event, 'token');
    const query = getQuery(event);

    
    try {
        const data = await $fetch(`${apiBase}/packages/${query.id}`, {
            headers: {
                'Accept': 'Multipart/Form-Data',
            },
        });
       console.log("ff" , data);
       

        return data;
    } catch (error) {
        return error;
    }
  
  })
