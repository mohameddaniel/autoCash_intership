import { BrandType } from "../../store/redux/features/fetch/fetchBrand/Brand.fetch";
import { ModelType } from "../../store/redux/features/fetch/fetchModel/fetch.model";
import { MonthsType } from "../../store/redux/features/fetch/fetchMonths/fetch.months";
import { NamesType } from "../../store/redux/features/fetch/fetchNames/fetch.names";

export const transBrnads = (brands:BrandType[]):NamesType[] => {
    return brands.map((item) => ({
        id:item.brand_id,
        name:item.brand_name
    }))
}


export const transModels = (models:ModelType[]):NamesType[] => {
    return models.map((item) => ({
        id:item.model_id,
        name:item.model_name
    }))
} 

export const transMonths = (months:MonthsType[]):NamesType[] => {
    return months.map((item) => ({
        id:item.id,
        name:item.month
    }))
}