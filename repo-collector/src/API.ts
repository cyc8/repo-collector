export async function OAuth(code: string): Promise<string | null> {
  try {
    const endpoint = `https://${process.env.REACT_APP_SERVER_URL}/oauth/github?${new URLSearchParams({ code })}`;
    const res = await fetch(endpoint, {
      method: 'post',
    });
    if (res.ok) {
      const body = await res.json();
      const accessToken = body?.accessToken;
      if (typeof accessToken === 'string') return accessToken;
    }
    return null;
  } catch (err) {
    return null;
  }
}
