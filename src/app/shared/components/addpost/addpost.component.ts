import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { UploadFilesService } from 'src/app/service/upload-file.service';


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
    get description() {
        return this.validateForm.get("description");
    }
    get tag() {
        return this.validateForm.get("tags");
    }
    submitForm(): void {
        this.getImagesUrl()
        console.log('submit', this.imageUrls);
        this.postService.createPost({
            "description": this.validateForm.value.description,
            "userId": localStorage.getItem("id"),
            "images": this.imageUrls,
            "tags": this.validateForm.value.tag
        }).subscribe(
            (data) => {
                if (data) {
                    console.log(data)
                    this.openSnackBar('Successfully', 'Close')
                    this.router.navigate(['/home/done']);
                    this.dialogRef.close();
                }
                else {
                    this.openSnackBar('Create Post Error', 'Close')
                }
            }
        )
    }

    constructor(
        private _snackBar: MatSnackBar,
        public postService: PostService,
        private fb: FormBuilder,
        private router: Router,
        public dialogRef: MatDialogRef<AddpostComponent>,
        private uploadService: UploadFilesService) { }

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

}
