import { removeProduct } from "../services/productService";
import { refreshProductList } from "./refreshProductList";

export const initRemoveProduct = async (
  id: number,
  removeBtn: HTMLElement,
): Promise<void> => {
  removeBtn.addEventListener("click", async () => {
    try {
      const success = await removeProduct(id);

      if (success) {
        console.log(success);
        await refreshProductList();
        return;
      }
      
      return console.error("Deletion failed");
    } catch (error) {
      console.error("Something went wrong with deletion: ", error);
    }
  });
};
