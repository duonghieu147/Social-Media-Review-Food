import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodShop } from 'src/app/model/foodshop.interface';
import { FoodShopService } from 'src/app/service/foodshop.service';

@Component({
  selector: 'list-foodshop',
  templateUrl: './foodshoplist.component.html',
  styleUrls: ['./foodshoplist.component.css']
})
export class FoodShopListComponent implements OnInit {
  page: number = 0;
  limit: number = 10;


  foodShop: FoodShop[] = [];

  constructor(public foodShopService: FoodShopService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLogin') !='true') {
      this.router.navigate(['/login']);
    }
    else {
      this.route.queryParams
        .subscribe((params) => {
        this.findAll(this.page, this.limit);
      }
      );
    }
  }


  findAll(page: any, limit: any) {
    this.foodShopService.findAll(page, limit).subscribe((res: FoodShop[]) => {
      this.foodShop = res;
      console.log(res)

    })
  }

  loadNextPage() {
    this.page = this.page + 1;
    this.findAll(this.page, this.limit);
  }

  onClickResult(userId: any) {
    this.router.navigate(
      ['/profile/' + userId]
    );
  }
}
