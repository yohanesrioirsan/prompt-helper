import PillNav from "@/components/PillNav";
import DotGrid from "@/components/DotGrid";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen relative">
      <div className="flex justify-center">
        <PillNav
          logo="/prompt-helper.png"
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "Collection", href: "/collection" },
            {
              label: "GitHub",
              href: "https://github.com/yohanesrioirsan/prompt-helper",
            },
          ]}
          className="custom-nav"
          activeHref="/"
          ease="power2.easeOut"
          baseColor="#00000"
          pillColor="#ffffff"
          hoveredPillTextColor="#8a00c4"
          pillTextColor="#000000"
        />
      </div>
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={30}
          baseColor="#676765"
          activeColor="#8A00C4"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      {children}
    </div>
  );
}
