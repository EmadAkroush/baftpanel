export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { public: { apiBase } } = useRuntimeConfig()
    const query = getQuery(event);
  

    try {
       
   
        const data = await $fetch(`${apiBase}/products/${query.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'Multipart/Form-Data',
            }
        })
        
        return data;
    } catch (error) {
        console.log("go" , error);
        
        return error
    }
})