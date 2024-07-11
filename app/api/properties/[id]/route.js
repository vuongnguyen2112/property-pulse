import connectDb from "@/config/database";
import Property from "@/models/Property";

// GET api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const properties = await Property.findById(params.id);

    if (!properties) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error({ error });
    return new Response("Something went wrong", { status: 500 });
  }
};
