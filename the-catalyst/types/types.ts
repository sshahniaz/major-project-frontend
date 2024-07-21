export interface ProductType {
  name: string;
  averageSales: number;
}

export interface OutletSize {
  size: string;
  averageSalesforSize: number;
  productTypes: ProductType[];
}

export interface OutletType {
  type: string;
  averageTypeSales: number;
  OutletSize: OutletSize[];
}

export interface LocationType {
  type: string;
  averageTierSales: number;
  OutletType: OutletType[];
}

export interface Top10ProductTypesSalesInterface {
  productType: string;
  sales: number;
}

export interface SalesData {
  top10ProductTypesSales: Top10ProductTypesSalesInterface[];
  locationType: LocationType[];
}