import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { UploadFilesService } from 'src/app/service/upload-file.service';
import { ShareService } from '../../../service/share.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
    selector: 'app-addfooditem',
    templateUrl: './addfooditem.component.html',
    styleUrls: ['./addfooditem.component.scss']
})
export class AddFoodItemComponent {

    validateForm!: FormGroup;
    shopId: any;
    isLoading: boolean = true;
    images: string[] = [];
    get description() {
        return this.validateForm.get("description");
    }
    get name() {
        return this.validateForm.get("name");
    }
    get price() {
        return this.validateForm.get("price");
    }
    submitForm(): void {

        this.openDialogLoading();
        this.uploadService.upload(this.images).pipe(
            switchMap((images: string[]) => {
                return this.shareService.addFoodItemToShop({
                    "name": this.validateForm.value.name,
                    "description": this.validateForm.value.description,
                    "images": images,
                    "price": this.validateForm.value.price
                }, this.data.shopId)
            }),
            finalize(() => {
                this.isLoading = false;
                this.dialog.closeAll();
            })
        ).subscribe((data) => {
            if (data) {
                console.log(data)
                this.dialogRef.close();
                this.openSnackBar('Successfully', 'Close')
                this.router.navigate(['/profile/' + this.data.userId]);
                //  localStorage.setItem('modepage','product');
            }
            else {
                this.openSnackBar('Create Item Error', 'Close')
            }
        });
    }

    constructor(
        private _snackBar: MatSnackBar,
        public shareService: ShareService,
        private fb: FormBuilder,
        private router: Router,
        public dialog: MatDialog,
        private uploadService: UploadFilesService,
        @Inject(MAT_DIALOG_DATA) public data: any,

        public dialogRef: MatDialogRef<AddFoodItemComponent>) { }

    ngOnInit(): void {
        this.shopId = this.data.shopId
        this.formInitialization()
    }

    formInitialization() {
        this.validateForm = this.fb.group({
            name: [null],
            description: [null],
            images: [null],
            price: [null],
        });
    }

    cancel() {
        this.dialogRef.close();
        console.log('cancel');
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, { duration: 2500 });
    }
    getFoodItemById(idFood: any) {
        this.shareService.getFoodItemById(idFood).subscribe(
            (data) => {
                if (data) {
                    console.log(data)
                    // this.router.navigate(['/profile/3']);
                }
                else {
                    this.openSnackBar('Create Post Error', 'Close')
                }
            }
        )
    }

    onSelectFile(event) {
        let files = event.target.files;
        if (files && files.length > 0) {
            for (let index = 0; index < files.length; index++) {
                this.readFile(files[index], this.images)
            }
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
}
