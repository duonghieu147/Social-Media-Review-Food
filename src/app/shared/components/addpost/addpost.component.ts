import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/service/post.service';
import { UploadFilesService } from 'src/app/service/upload-file.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
    selector: 'app-addpost',
    templateUrl: './addpost.component.html',
    styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent {
    inputValue: string = '';

    suggestions = ['Coffee', 'Douong', 'highland', 'duonghieu147 ', 'reivew', 'sanpham'];

    validateForm!: FormGroup;
    tags: any;
    images: string[] = [];
    imageUrls: string[] = [];
    isLoading: boolean = true;
    get description() {
        return this.validateForm.get("description");
    }
    get tag() {
        return this.validateForm.get("tags");
    }
    formatTags(tags: string) {
        console.log(tags.split(' ').filter(v=> v.startsWith('#')))
        this.tags = tags.split(' ').filter(v=> v.startsWith('#'))
    }
    submitForm(): void {
        this.formatTags(this.validateForm.value.tags)
        this.openDialogLoading();
        this.uploadService.upload(this.images).pipe(
            switchMap((images: string[]) => {
                return this.postService.createPost({
                    "description": this.validateForm.value.description,
                    "userId": localStorage.getItem("id"),
                    "images": images,
                    "tags": this.tags
                })
            }),
            finalize(() => {
                this.isLoading = false;
                this.dialog.closeAll();
            })
        ).subscribe((data) => {
            if (data) {
                console.log(data)
                this.openSnackBar('Successfully', 'Close')
                this.router.navigate(['/home/done']);
                this.dialogRef.close();
            }
            else {
                this.openSnackBar('Create Post Error', 'Close')
            }
        });
    }

    constructor(
        private _snackBar: MatSnackBar,
        public postService: PostService,
        private fb: FormBuilder,
        private router: Router,
        public dialogRef: MatDialogRef<AddpostComponent>,
        private uploadService: UploadFilesService,
        public dialog: MatDialog) { }

    ngOnInit(): void {
        this.formInitialization()
    }
    formInitialization() {
        this.validateForm = this.fb.group({
            description: [null],
            images: [null],
            tags: [null],
        });
    }
    onChange(value: string): void {
        console.log(value);
        this.tags = value.trim().split(" ")
        console.log(this.tags)
    }

    onSelect(suggestion: string): void {
        console.log(`onSelect ${suggestion}`);
    }
    cancel() {
        this.dialogRef.close();
        console.log('cancel');
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, { duration: 2500 });
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

    getImagesUrl() {
        return this.uploadService.upload(this.images).subscribe((res: string[]) => {
            this.imageUrls = res;
        })
    }

    openDialogLoading() {
        this.dialog.open(LoadingComponent, {
        })
    }

    

}
