import { NextResponse } from "next/server";

const API_URL = "https://falconcloud.co/site_srv10_ph/site/api/qserv.php/13465-770721";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Verificar que el cuerpo de la petición no este vacio
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "El cuerpo de la petición no puede estar vacío." }, { status: 400 });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error en la API externa (${response.status})` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validar si la API externa devuelve un mensaje de error
    if (data.message) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error en el servidor: ${error}` }, { status: 500 });
  }
}
