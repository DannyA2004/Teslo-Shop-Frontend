import { CustomPagination } from "@/components/Custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

  const {data} = useProducts();

  return (
    <>
      <CustomJumbotron title="All Products"/>
      <ProductsGrid products={data?.products || []}/>
      <CustomPagination totalPages={data?.pages || 0}/>
    </>
  )
}
