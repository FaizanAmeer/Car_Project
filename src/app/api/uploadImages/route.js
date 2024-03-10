import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.error(new Error("Method Not Allowed"), { status: 405 });
  }

  const formData = await req.formData();
  const images = formData.getAll("Images");
  const imagesPath = [];

  if (!images || images.length === 0) {
    return NextResponse.json({ error: "No images received." }, { status: 400 });
  }

  for (const image of images) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + "_" + image.name.replaceAll(" ", "_");
    imagesPath.push(filename);
    try {
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );
    } catch (error) {
      return NextResponse.error(
        new Error("Error occurred while saving image:" + error),
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    Message: "Images saved successfully",
    url: imagesPath,
    status: 201,
  });
}

export function routeConfig() {
  return {
    api: {
      bodyParser: false, // Disable built-in bodyParser to handle formData
    },
  };
}
