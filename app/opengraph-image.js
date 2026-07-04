import { ogImage, OG_SIZE } from "@/lib/og";
import { site } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = site.name;

export default function Image() {
  return ogImage({ title: site.name, subtitle: site.description });
}
