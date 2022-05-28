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
    district: number = null;
    province: number = null;
    categoryId: number = null;

    constructor(
        private locationService: LocationService,
        private foodShopService: FoodShopService,
        private router: Router
    ) {
    }

    ngOnInit(): void {

        this.locationService.findAllProvince().subscribe((provinces: Location[]) => {
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
        let params: any = {};
        if (query!='') {
            params['query'] = query;
        }
        if (provinceId > 0) {
            params['provinceId'] = provinceId;
        }
        if (categoryId > 0) {
            params['categoryId'] = categoryId;
        }
        if (districtId > 0) {
            params['districtId'] = districtId;
        }
        this.router.navigate(
            ['/home/search'],
            { queryParams: params }
        );
    }
    home() {
        this.router.navigate(
            ['/home/post']
        ).then(_ => {
            window.location.reload();
        });
    }
}
