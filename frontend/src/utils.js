export async function make_post_call(endpoint, input){
    try{
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input)
      });
      if (!response?.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    }
    catch(err){
      console.error("Api call error: ", err);
    }
  }
  