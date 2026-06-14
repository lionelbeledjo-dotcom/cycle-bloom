import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

type GeocodeResult = {
  formattedAddress: string;
  city: string;
  postalCode: string;
};

export const reverseGeocode = createServerFn({ method: "POST" })
  .inputValidator((input) => coordinatesSchema.parse(input))
  .handler(async ({ data }): Promise<GeocodeResult> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!lovableKey || !mapsKey) throw new Error("Le service de localisation est momentanément indisponible.");

    const endpoint = new URL("https://connector-gateway.lovable.dev/google_maps/maps/api/geocode/json");
    endpoint.searchParams.set("latlng", `${data.latitude},${data.longitude}`);
    endpoint.searchParams.set("language", "fr");
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": mapsKey,
      },
    });
    if (!response.ok) throw new Error("L’adresse correspondant à votre position n’a pas pu être trouvée.");

    const payload = await response.json() as {
      status?: string;
      results?: Array<{ formatted_address: string; address_components: Array<{ long_name: string; types: string[] }> }>;
    };
    const result = payload.results?.[0];
    if (!result || payload.status !== "OK") throw new Error("Aucune adresse trouvée pour cette position.");
    const component = (type: string) => result.address_components.find((item) => item.types.includes(type))?.long_name ?? "";
    return {
      formattedAddress: result.formatted_address,
      city: component("locality") || component("postal_town") || component("administrative_area_level_2"),
      postalCode: component("postal_code"),
    };
  });