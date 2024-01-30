import Link from "next/link";
import Image from "next/image";
import prismadb from "@/lib/prismadb";
import SearchInput from "@/components/SearchInput";
import getCurrentUser from "@/actions/getCurrentUser";

async function MakeupPage() {
  const currentUser = await getCurrentUser();

  const products = await prismadb.product.findMany({
    where: {
      category: {
        type: "Makeup",
      },
    },
    include: {
      images: true,
      Review: true,
    },
  });

  return (
    <div>
      <div className="page__hero">
        <div className="page__breadcrubms">
          <Link href="/">Home</Link>
          <span className="page__breadcrubms-divider"></span>
          <span className="page__breadcrubms-current">Makeup</span>
        </div>
        <div className="page__hero-inner">
          <div className="page__hero-heading">
            <h2 className="page__hero-title">Makeup Products</h2>
          </div>
        </div>
      </div>
      <SearchInput currentUser={currentUser} type="Makeup"/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Loop over Products */}
        {products &&
          products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="product__slide"
            >
              <div className="product__slide-img">
                <Image
                  src={product?.images[0]?.url}
                  width={755}
                  height={483}
                  alt="slide image"
                />
              </div>
              <div className="product__slide-info">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="product__slide-title">{product.title}</h4>
                    <p className="product__slide-desc line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MakeupPage;
