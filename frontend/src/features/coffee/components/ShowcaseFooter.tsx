import React from "react";

export const ShowcaseFooter: React.FC = () => (
  <section className="relative w-full md:mt-24 md:py-25 bg-ui-black text-ui-white">
    <div className="relative md:bottom-inset-0">
      <img
        src="/footer.png"
        alt="Coffee beans background"
        className="object-cover w-full h-[100px] md:h-[300px]"
        height={300}
        width={1920}
      />
      <div
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        style={{
          background: "linear-gradient(to top, transparent 60%, #0F0F0F 100%)",
        }}
      />
    </div>
  </section>
);
