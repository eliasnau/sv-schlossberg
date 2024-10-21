import Image from "next/image";

export function Sponsors() {
  return (
    <section className="bg-[#e0ebe0] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#1a5f1a]">
          Unsere Sponsoren
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((sponsor) => (
            <div
              key={sponsor}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src="/placeholder.svg?height=100&width=200"
                alt={`Sponsor ${sponsor}`}
                width={200}
                height={100}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
