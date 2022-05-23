import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { Location } from 'src/app/model/location.interface';
import { FoodShopRequest } from 'src/app/model/request/foodshop';
import { FoodShopService } from 'src/app/service/foodshop.service';
import { LocationService } from 'src/app/service/location.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UploadFilesService } from 'src/app/service/upload-file.service';
import { ShareService } from '../../../service/share.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
    selector: 'app-addfoodshop',
    templateUrl: './addfoodshop.component.html',
    styleUrls: ['./addfoodshop.component.scss']
})
export class AddFoodShopComponent {
    provinces: Location[] = [];
    districts: Location[] = [];
    submitForm: FormGroup;
    images: string[] = [];
    avatarImage: SafeUrl;
    avatarImages: string[] = [];
    avatarUrl: string;
    imageUrls: string[];
    isLoading: boolean = true;
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
        private domSanitizer: DomSanitizer,
        private uploadService: UploadFilesService,
        private tokenStorage: TokenStorageService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.formInitialization();
        this.locationService.findAllProvince().subscribe((value: Location[]) => {
            this.provinces = value;
        })
    };


    onChangeProvince(id: number) {
        this.locationService.findDistrictByProvinceId(id).subscribe((res: Location[]) => {
            this.districts = res;
        })
    }

    getImagesUrl() {
        return this.uploadService.upload(this.images).subscribe((res: string[]) => {
            this.imageUrls = res;
        })
    }
    getAvatarUrl() {
        return this.uploadService.upload(this.avatarImages).subscribe((res: string[]) => {
            if (res.length > 0 && res) {
                this.avatarUrl = res[0];
            }
        })
    }

    onSubmit() {
        this.openDialogLoading();
        this.uploadService.upload(this.images).pipe(
            switchMap((images: string[]) => {
                let body = this.submitForm.getRawValue();
                let data = new FoodShopRequest(body.name === "" ? null : body.name,
                    images,
                    body.location === "" ? null : body.location,
                    body.categoryId === "" ? null : body.categoryId,
                    body.description === "" ? null : body.description,
                    body.districtId === "" ? null : body.districtId,
                    body.provinceId === "" ? null : body.provinceId,
                    body.open === "" ? null : body.open,
                    body.close === "" ? null : body.close,
                    parseInt(localStorage.getItem("id")),
                    this.avatarUrl);
                return this.foodShopService.createFoodShop(data);
            }),
            finalize(() => {
                this.isLoading = false;
                this.dialog.closeAll();
            })
            ).subscribe((data) => {
                console.log(data)
                this.openSnackBar('Successfully', 'Close')
                this.router.navigate(['/profile/' + this.tokenStorage.getUser().id])
            });

    }

    // createFoodShop(images: string[]) {
    //     let body = this.submitForm.getRawValue();
    //     let data = new FoodShopRequest(body.name === "" ? null : body.name,
    //         images,
    //         body.location === "" ? null : body.location,
    //         body.categoryId === "" ? null : body.categoryId,
    //         body.description === "" ? null : body.description,
    //         body.districtId === "" ? null : body.districtId,
    //         body.provinceId === "" ? null : body.provinceId,
    //         body.open === "" ? null : body.open,
    //         body.close === "" ? null : body.close,
    //         parseInt(localStorage.getItem("id")),
    //         this.avatarUrl);
    //     this.createShop(data);
    // }
    // createShop(data: FoodShopRequest) {
    //     this.foodShopService.createFoodShop(data).subscribe((res: any) => {
    //         this.router.navigate(['/profile/' + this.tokenStorage.getUser().id])
    //     })
    // }

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
        if (files) {
            this.readFile(files[0], this.avatarImages)

        }

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

    openDialogLoading() {
        const dialogRef = this.dialog.open(LoadingComponent, {
        })
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, { duration: 2500 });
    }

}