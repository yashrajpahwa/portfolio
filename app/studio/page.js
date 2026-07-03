import { notFound } from "next/navigation";
import StudioEditor from "@/components/studio/StudioEditor";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <StudioEditor />;
}
