import cloudinary from "@/config/cloudinary";
import connectDb from "@/config/database";
import { defaultPage, defaultPageSize } from "@/constants/properties";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET api/properties/featured
export const GET = async (request) => {
  try {
    await connectDb();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error({ error });
    return new Response("Something went wrong", { status: 500 });
  }
};
