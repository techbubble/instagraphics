import type { Metadata } from "next";
import SubmapMock from "./SubmapMock";

// Hidden mockup: document-as-subway-map summarizer concept.
// Reachable only by direct URL: /concepts/submap

export const metadata: Metadata = {
  title: "Submap Mockup",
  robots: { index: false, follow: false },
};

export default function SubmapPage() {
  return <SubmapMock />;
}
