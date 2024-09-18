export interface CompaniesLogoI {
  _id: string;
  brand: string;
  thumbnail: string;
}

export interface ResponseCompaniesLogoI {
  status: number;
  data: CompaniesLogoI[];
}

export interface ResponseBrandsI {
  status: number;
  data: string[];
}
