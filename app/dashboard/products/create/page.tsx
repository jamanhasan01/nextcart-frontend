import { ChevronLeft } from "lucide-react";
import DashboardHeader from "../../components/ui/DashboardHeader";

const AddProduct = () => {
  return (
    <div>
      <DashboardHeader
        title="Add New Product"
        subtitle="Create a new entry in your digital inventory"
        buttonText="Back to Products"
        buttonLink="/dashboard/products"
        buttonIcon={<ChevronLeft/>}
      />
    </div>
  );
};

export default AddProduct;
