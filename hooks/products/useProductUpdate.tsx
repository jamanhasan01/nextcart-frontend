import { ProductService } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";

const useProductUpdate = () => {
    const mutation=useMutation({
        mutationFn:ProductService.update
    })

    return mutation
};

export default useProductUpdate;
