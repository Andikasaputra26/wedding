import { JSX } from "react";

const images: string[] = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
];

export default function Gallery(): JSX.Element {
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
  ];

  return (
    <section className="py-24 bg-white text-center">
      <h2 className="text-4xl mb-12">Galeri Kenangan</h2>

      <div className="flex gap-8 overflow-x-auto px-6 snap-x snap-mandatory">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Gallery"
            className="snap-center min-w-[80%] md:min-w-[30%] h-96 object-cover rounded-3xl shadow-xl grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
}
