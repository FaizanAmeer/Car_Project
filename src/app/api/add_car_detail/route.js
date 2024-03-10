import Auth from "dd(@/Utility/auth)";
import schema from "dd(@/Utility/formValidation)";
import connectDB from "dd(@/config/db)";
import carDetail from "dd(@/models/carDetail)";

export async function POST(req, res) {
  connectDB();
  try {
    if (req.method === "POST") {
      const token = await req.headers.get("Authorization");

      if (!token || !token.startsWith("Bearer")) {
        throw new Error("Token is required or invalid");
      }
      const { id } = await Auth.verifyToken(token);
      const data = await req.json();
      const validation = schema.validateSync({
        ...data,
        maxPictures: data?.images?.length,
      });

      const submitValues = {
        carModel: data.carModel,
        price: data.price,
        phoneNumber: data.phoneNumber,
        maxPictures: data?.images?.length,
        pictures: data?.images,
        userId: id,
      };

      const car = await carDetail.create({
        ...submitValues,
      });

      return Response.json({
        message: "Data Added successfully",
        Ok: true,
        car: car,
        success: true,
      });
    } else {
      return Response.json({ message: `method ${req.method} not allowed` });
    }
  } catch (e) {
    return Response.json(e);
  }
}
