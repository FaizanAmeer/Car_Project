import multerMiddleware from "dd(@/Utility/multer)";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req, res) => {
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
      throw new Error("Error occurred while saving image:", error);
    }
  }

  return NextResponse.json({
    Message: "Images saved successfully",
    url: imagesPath,
    status: 201,
  });
};
