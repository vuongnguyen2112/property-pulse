const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
async function fetchProperties(showFeatured = false) {
  try {
    // if domain is unavailable yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Fail to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error({ error });
    return [];
  }
}

// fetch property by id
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
