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
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}&zoom=16&addressdetails=1&accept-language=fr`;
    const response = await fetch(url, {
      headers: { "User-Agent": "CycleBloom/1.0 (health-app)" },
    });
    if (!response.ok) throw new Error("L'adresse correspondant à votre position n'a pas pu être trouvée.");

    const payload = await response.json() as {
      display_name?: string;
      address?: {
        city?: string;
        town?: string;
        village?: string;
        municipality?: string;
        postcode?: string;
        road?: string;
        house_number?: string;
        suburb?: string;
        state?: string;
      };
    };

    if (!payload.address) throw new Error("Aucune adresse trouvée pour cette position.");

    const addr = payload.address;
    const city = addr.city || addr.town || addr.village || addr.municipality || "";
    const road = addr.road || "";
    const number = addr.house_number || "";
    const formattedAddress = [number, road, addr.postcode, city].filter(Boolean).join(", ");

    return {
      formattedAddress: formattedAddress || payload.display_name || "Position détectée",
      city,
      postalCode: addr.postcode || "",
    };
  });
