import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodShop } from 'src/app/model/foodshop.interface';
import { FoodShopService } from 'src/app/service/foodshop.service';

@Component({
  selector: 'search-foodshop',
  templateUrl: './searchfoodshop.component.html',
  styleUrls: ['./searchfoodshop.component.css']
})
export class SearchFoodShop implements OnInit {
  query: string | null = '';
  provinceId: number | null = 0;
  districtId: number | null = 0;
  categoryId: number | null = 0;
  page: number = 0;
  limit: number = 10;


  foodShop: FoodShop[] = [];

  constructor(public foodShopService: FoodShopService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe((params) => {
        console.log(params)
        this.query = params['query'] || '';
        this.provinceId = params['provinceId'] ? Number(params['provinceId']) : null;
        this.districtId = params['districtId'] ? Number(params['districtId']) : null;
        this.categoryId = params['categoryId'] ? Number(params['categoryId']) : null;
        this.searchFoodShop(this.query, this.provinceId, this.districtId, this.categoryId, this.page, this.limit);
      }
      );
  }


  searchFoodShop(query: any, provinceId: any, districtId: any, categoryId: any, page: any, limit: any) {
    this.foodShopService.findFoodShops(query, provinceId, districtId, categoryId, page, limit).subscribe((res: FoodShop[]) => {
      this.foodShop = res;

    })
  }

  loadNextPage() {
    this.page = this.page + 1;
    this.searchFoodShop(this.query, this.provinceId, this.districtId, this.categoryId, this.page, this.limit);
  }

  onClickResult(userId: any) {
    this.router.navigate(
      ['/profile/' + userId]
    );
  }
}
