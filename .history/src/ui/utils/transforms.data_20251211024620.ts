import { BrandType } from "../../store/redux/features/fetch/fetchBrand/Brand.fetch";
import { NamesType } from "../../store/redux/features/fetch/fetchNames/fetch.names";

const dataGen = (brands:BrandType[]):NamesType[] => {
    return brands.map((item) => ({
        id:item.brand_id,
        name:item.brand_name
    }))
}