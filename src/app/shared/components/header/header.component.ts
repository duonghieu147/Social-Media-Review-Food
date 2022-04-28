import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.interface';
import { FoodShopService } from '../../foodshop.service';
import { LocationService } from '../../location.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  provinces: Location[] = [];
  districts: Location[] = [];

  query:string  = ''; 
  district: number = -1; 
  province: number = -1;
  categoryId: number= -1;

  constructor(
    private locationService: LocationService,
    private foodShopService: FoodShopService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {

    this.locationService.findAllProvince().subscribe((provinces: Location[]) => {
      console.log(provinces)
      this.provinces = provinces;
    })
  }
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  logOut() {
    this.router.navigate(['/login']);

  }

  onChangeProvince(id: number) {
    this.locationService.findDistrictByProvinceId(id).subscribe((res: Location[]) => {
      this.districts = res;
    })
  }

  onSearch() {
    this.foodShopService.findFoodShops(this.query, this.province, this.district, this.categoryId).subscribe(res=>{
      console.log(res)
    })
    console.log(this.province, this.district, this.categoryId);
  }
}
