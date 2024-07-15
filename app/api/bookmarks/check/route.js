import connectDb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDb();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // find user in db
    const user = await User.findById({ _id: userId });

    let isBookmarked = user?.bookmarks?.includes(propertyId);

    await user.save();

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
