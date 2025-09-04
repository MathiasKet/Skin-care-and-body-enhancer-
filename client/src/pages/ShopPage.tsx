import { useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import ProductListPage from "./ProductListPage";

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  
  // This component now mainly serves as a layout wrapper
  // All the filtering logic has been moved to ProductListPage

  return (
    <>
      <Helmet>
        <title>Shop | Skincare & Body Care Products</title>
        <meta
          name="description"
          content="Browse our collection of premium skincare and body care products. Find the perfect products for your skin type and concerns."
        />
      </Helmet>
      <ProductListPage />
    </>
  );
};

export default ShopPage;
