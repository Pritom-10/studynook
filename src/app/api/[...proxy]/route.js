export async function POST(req, { params }) {
  const path = params.proxy.join("/");
  const body = await req.text();

  const res = await fetch(`${process.env.API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.get("cookie") || "",
    },
    body,
  });

  const data = await res.text();
  const response = new Response(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
