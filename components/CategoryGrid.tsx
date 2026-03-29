import Image from "next/image";
import Link from "next/link";

type CategoryCard = {
  title: string;
  description: string;
  href: string;
  image: string;
};

type CategoryGridProps = {
  categories: readonly CategoryCard[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
          Shop By Category
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Built around footwear, streetwear, and lifestyle detail.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 shadow-card"
          >
            <div className="relative h-[320px]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,161,0,0.18),transparent_30%)]" />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-6">
              <p className="text-2xl font-semibold text-white">{category.title}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-300">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
