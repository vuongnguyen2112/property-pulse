import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDb();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message Not Found", { status: 404 });
    }

    // vertify onwership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // update message read/unread depend on current status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDb();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message Not Found", { status: 404 });
    }

    // vertify onwership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message Deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
