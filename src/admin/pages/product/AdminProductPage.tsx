
import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/Custom/CustomFullScreenLoading';

import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const {isLoading, isError, data: product, mutation} = useProduct(id || "" );

  

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handelSubmit = async(productLike: Partial<Product> & {files?: File[]}) => {    

    await mutation.mutate(productLike, {
      onSuccess: (data) => {
        toast.success("Product Updated Succesfully", {
          position: 'top-right'
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast("Error Updating Product", {
          position: 'top-right'
        })
        
      }
    })
  }

  if (isError) {
    return <Navigate to="/admin/products"/>
  }

  if (isLoading) {
    return <CustomFullScreenLoading/>
  }

  if (!product){
    return <Navigate to= "/admin/products"/>
  }

  return <ProductForm 
            title={title}
            subtitle={subtitle}
            product={product}
            isPending= {mutation.isPending}
            onSubmit= {handelSubmit}
            />
};