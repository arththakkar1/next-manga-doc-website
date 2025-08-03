// MangaPanel.tsx
import Image from "next/image";
import React from "react";

type MangaPanelProps = {
  src: string;
  alt: string;
};

const MangaPanel: React.FC<MangaPanelProps> = ({ src, alt }) => {
  return (
    <div className="w-full h-full relative">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 200px"
      />
    </div>
  );
};

export default MangaPanel;
