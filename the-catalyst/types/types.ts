export interface ProductType {
  productType: string;
  sales: number;
}

export interface OutletSize {
  size: string;
  averageSalesforSize: number;
  productTypes: ProductType[];
}

export interface OutletType {
  type: string;
  averageTypeSales: number;
  outletSizes: OutletSize[]; // Renamed for clarity
}

export interface LocationType {
  type: string;
  averageTierSales: number;
  outletTypes: OutletType[]; // Renamed for clarity
}

export interface SalesData {
  locationType: LocationType[];
  top10ProductTypesSales: ProductType[];
}