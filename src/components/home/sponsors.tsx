import Image from "next/image";

const sponsors = [
  {
    src: "/img/sponsoren/GoGlasW.jpg",
    alt: "GoGlas",
    link: "https://www.go-glas.de/",
  },
  {
    src: "/img/sponsoren/heilmaierW.png",
    alt: "Heilmaier",
    link: "https://www.heilmaier-projektbau.de/", /*** Der link geht nicht. Unbeding nachfragen was wir machen. (Alle links sind von der svs website). */
  },
  {
    src: "/img/sponsoren/NiedermayrW.png",
    alt: "Niedermayr",
    link: "https://www.niedermayr-autoglas.de/",
  },
  {
    src: "/img/sponsoren/OrthoW.png",
    alt: "Ortho",
    link: "https://www.orthozentrum.net/",
  },
  {
    src: "/img/sponsoren/ReweW.png",
    alt: "Rewe",
    link: "https://www.rewe.de/marktseite/stephanskirchen/865846/rewe-markt-habichtstr-3/",
  },
];

export function Sponsors() {
  return (
    <section className="bg-[#e0ebe0] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#1a5f1a]">
          Unsere Sponsoren
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex justify-center items-center"
            >
              <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={200} // Remove these or adjust as needed
                  height={100} // Remove these or adjust as needed
                  className="object-contain max-w-full max-h-full"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
