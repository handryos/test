import Image from "next/image";
import React from "react";

export const ShowcaseFooter: React.FC = () => (
  <section className="relative w-full md:mt-24 md:py-25 bg-ui-bg text-ui-white">
    <div className="relative md:bottom-inset-0">
      <Image
        src="/footer.png"
        alt="Coffee beans background"
        className="object-cover w-full h-[100px] md:h-[300px]"
        height={300}
        width={1920}
      />
      <div
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        style={{
          background: "linear-gradient(to top, transparent 60%, #101011 100%)",
        }}
      />
    </div>
  </section>
);
