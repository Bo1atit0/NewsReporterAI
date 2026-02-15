export async function generateArticle(topic) {
  const url = await fetch(
    'https://newsreporterai-production.up.railway.app/api/v1/generate',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    }
  );
  const article = await url.json();
  return article;
}
