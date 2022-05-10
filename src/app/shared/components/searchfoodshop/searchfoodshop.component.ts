import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodShop } from 'src/app/model/foodshop.interface';
import { ListDTO } from 'src/app/model/listdto.interface';
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


  foodShop: FoodShop[] =[];

  constructor(public foodShopService: FoodShopService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params) => {
        this.query = params.get('query');
        this.provinceId = params.get('provinceId') ? Number(params.get('provinceId')) : null;
        this.districtId = params.get('districtId') ? Number(params.get('districtId')) : null;
        this.categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : null;
      }
      );
    this.searchFoodShop(this.query, this.provinceId, this.districtId, this.categoryId);
  }


  searchFoodShop(query: any, provinceId: any, districtId: any, categoryId: any) {
    this.foodShopService.findFoodShops(query, provinceId, districtId, categoryId).subscribe((res: FoodShop[]) => {
      this.foodShop = res;
      
    })
  }
}
