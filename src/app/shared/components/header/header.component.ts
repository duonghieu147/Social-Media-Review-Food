import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.interface';
import { FoodShopService } from '../../../service/foodshop.service';
import { LocationService } from '../../../service/location.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  provinces: Location[] = [];
  districts: Location[] = [];

  query: string = '';
  district: number = -1;
  province: number = -1;
  categoryId: number = -1;

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
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  onChangeProvince(id: number) {
    this.locationService.findDistrictByProvinceId(id).subscribe((res: Location[]) => {
      this.districts = res;
    })
  }

  onSearch(query: string, provinceId: number, districtId: number, categoryId: number) {
    this.router.navigate(
      ['/search'],
      { queryParams: { query: query, provinceId: provinceId, districtId: districtId, categoryId: categoryId } }
    );
  }
  home() {
    this.router.navigate(
      ['']
    );
  }
}
