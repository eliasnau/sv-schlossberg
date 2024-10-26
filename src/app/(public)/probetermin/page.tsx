import Image from "next/image";

export default function Sportarten() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            src: "/img/sports/fussball.jpg",
            alt: "Fußball",
            sport: "Fußball",
            link: "/probetermin/fussball",
          },
          {
            src: "/img/sports/ballet.jpg",
            alt: "Ballet",
            sport: "Ballet",
            link: "/probetermin/ballet",
          },
          {
            src: "/img/sports/gymnastik.jpg",
            alt: "Gymnastik",
            sport: "Gymnastik",
            link: "/probetermin/gymnastik",
          },
          {
            src: "/img/sports/eisstock.jpg",
            alt: "Eisstock",
            sport: "Eisstock",
            link: "/probetermin/eisstock",
          },
          {
            src: "/img/sports/icehockey.jpg",
            alt: "Eishockey",
            sport: "Eishockey",
            link: "/probetermin/eishockey",
          },
          {
            src: "/img/sports/jugendfussball.jpg",
            alt: "Jugendfußball",
            sport: "Jugendfußball",
            link: "/probetermin/jugendfussball",
          },
          {
            src: "/img/sports/leichtathletik.jpg",
            alt: "Leichtathletik",
            sport: "Leichtathletik",
            link: "/probetermin/leichtathletik",
          },
          {
            src: "/img/sports/ski.jpg",
            alt: "Ski",
            sport: "Ski",
            link: "/probetermin/ski",
          },
          {
            src: "/img/sports/tennis.jpg",
            alt: "Tennis",
            sport: "Tennis",
            link: "/probetermin/tennis",
          },
          {
            src: "/img/sports/tischtennis.jpg",
            alt: "Tischtennis",
            sport: "Tischtennis",
            link: "/probetermin/tischtennis",
          },
          {
            src: "/img/sports/turnen.jpg",
            alt: "Turnen",
            sport: "Turnen",
            link: "/probetermin/turnen",
          },
        ].map((image, index) => (
          <a href={image.link} className="block p-1" key={index}>
            <div className="relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={400}
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-[#1a5f1a]/80 text-white px-4 py-2 rounded">
                {image.sport}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
