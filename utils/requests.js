const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
async function fetchProperties() {
  try {
    // if domain is unavailable yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Fail to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error({ error });
    return [];
  }
}

// fetch properties by id
async function fetchProperty(id) {
  try {
    // if domain is unavailable yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Fail to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export { fetchProperties, fetchProperty };
