
import image404 from '/image404.webp'

export function Error404() {
  return (
    <section className="text-center">
      <img
        src={image404}
        alt="Ilustración de tablero con 404"
        className="
            mx-auto h-auto aspect-[4/3]
            w-[clamp(220px,60vw,600px)]
            md:w-[clamp(280px,50vw,640px)]
            lg:w-[clamp(320px,40vw,700px)]
          "
        loading="eager"
        decoding="async"
      />
      <h1 className="text-xl font-semibold mt-6">Página no encontrada</h1>
    </section>
  );
}
