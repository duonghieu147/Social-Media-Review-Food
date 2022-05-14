export class FoodShopRequest {
    name: String;
    images: String[];
    location: String;
    categoryId: number
    description: String;
    districtId: number;
    provinceId: number;
    open: number;
    close: number;
    userId: number
    constructor(
        name: String,
        images: String[],
        location: String,
        categoryId: number,
        description: String,
        districtId: number,
        provinceId: number,
        open: number,
        close: number,
        userId: number) {

        this.name = name;
        this.images = images;
        this.location = location;
        this.categoryId = categoryId;
        this.description = description;
        this.districtId = districtId;
        this.provinceId = provinceId;
        this.open = open;
        this.close = close;
        this.userId = userId;

    }
}