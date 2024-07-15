import connectDb from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/bookmarks
export const GET = async () => {
  try {
    await connectDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // find user in db
    const user = await User.findOne({ _id: userId });

    // get user bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.error(err);
    return new Response("Something went wrong", { status: 500 });
  }
};

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
    const user = await User.findOne({ _id: userId });

    let isBookmarked = user?.bookmarks?.includes(propertyId);

    let message;

    if (isBookmarked) {
      // if already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // if not, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
