import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.interface';
import { FoodShopRequest } from 'src/app/model/request/foodshop';
import { FoodShopService } from 'src/app/service/foodshop.service';
import { LocationService } from 'src/app/service/location.service';
import { ShareService } from '../../../service/share.service';


@Component({
    selector: 'app-addfoodshop',
    templateUrl: './addfoodshop.component.html',
    styleUrls: ['./addfoodshop.component.scss']
})
export class AddFoodShopComponent {
    provinces: Location[] = [];
    districts: Location[] = [];
    submitForm: FormGroup;
    images = [];
    avatarImage: SafeUrl;
    get name() {
        return this.submitForm.get("name");
    }

    get location() {
        return this.submitForm.get("location");

    } get avatar() {
        return this.submitForm.get("avatar");
    }

    get categoryId() {
        return this.submitForm.get("categoryId");
    }

    get open() {
        return this.submitForm.get("open");
    }

    get close() {
        return this.submitForm.get("close");
    }

    get districtId() {
        return this.submitForm.get("districtId");
    }

    get provinceId() {
        return this.submitForm.get("provinceId");
    }

    get description() {
        return this.submitForm.get("description");
    }


    constructor(
        public shareService: ShareService,
        private fb: FormBuilder,
        private router: Router,
        private locationService: LocationService,
        private foodShopService: FoodShopService,
        private domSanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.formInitialization();
        this.locationService.findAllProvince().subscribe((value: Location[]) => {
            console.log(value)
            this.provinces = value;
        })
    };


    onChangeProvince(id: number) {
        this.locationService.findDistrictByProvinceId(id).subscribe((res: Location[]) => {
            this.districts = res;
        })
    }

    onSubmit() {
        this.createFoodShop();
    }

    createFoodShop() {
        let body = this.submitForm.getRawValue();
        let data = new FoodShopRequest(body.name,body.images,body.location,body.categoryId,body.description,body.districtId,body.provinceId,body.open,body.close,parseInt(localStorage.getItem("id")));
        this.createListing(data);
    }
    createListing(data) {
        this.foodShopService.createFoodShop(data);
    }

    formInitialization() {
        this.submitForm = this.fb.group({
            name: [
                "",
                [
                    Validators.required
                ],
            ],
            location: [
                "",
                [
                    Validators.required,
                ],
            ],
            categoryId: [
                undefined,
                [Validators.required]
            ],
            districtId: [
                "",
                [Validators.required]
            ],
            provinceId: [
                "",
                [Validators.required]
            ],
            description: [
                "",
                [
                    Validators.required,
                ],
            ],
            open: [
                "",
                [
                    Validators.required,
                ],
            ],
            close: [
                "",
                [
                    Validators.required,
                ],
            ],
            images: [
                "",
                [
                    Validators.required,
                ],
            ]
        });
    }
    onSelectFile(event) {
        let files = event.target.files;
        if (files && files.length > 0) {
            for (let index = 0; index < files.length; index++) {
                this.readFile(files[index], this.images)
            }
        }
    }
    
    onSelectAvatarImage(event) {
        let files = event.target.files;
        this.avatarImage = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[0]));
        console.log(this.avatarImage);
    }
    removeImage(index: any) {
        //this.imageService.removeImage(index, [this.images, this.existingImages, this.imageIDs]);
    }

    readFile(file, listFile) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
            listFile.push(event.target.result);
        };
        reader.readAsDataURL(file);
    }

}