import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchImageService {

  constructor() { }

  ImageSearch = async (img:any, bas64:string) => {

    let canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    let ctx = canvas.getContext("2d");

    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);


    const res = await fetch("https://trace.moe/api/search", {
      method: "POST",
      body: JSON.stringify({ image: canvas.toDataURL('image/jpeg, image/png, image/bmp, image/gif;'+bas64, 0.8) }),
      headers: { "Content-Type": "aplication/json" }
    });
    const json = await res.json();
    return json;
  }
}
