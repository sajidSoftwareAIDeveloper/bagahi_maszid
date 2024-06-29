export async function ConnectToAPI(location,data,collect,method){
    const res = await fetch("/api/"+location, {
        method: method,
        body: JSON.stringify({data, collect}),
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (res.ok) {
        return resData;
      } else {
       return 0;
      }
}

