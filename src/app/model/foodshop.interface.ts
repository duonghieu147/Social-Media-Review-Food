
export interface FoodShop {
    id:number;
    name:string;
    location: string;
    provinceId:string;
    districtId: string;
    rating :Rating;
    categoryId: number;
    time: string;
    avatar: string;
    description:string;
    userId:number;
  }

  export interface Rating {
    overall:number,
    quality:number,
    service:number,
    price:number,
    space:number,
    location:number
  }