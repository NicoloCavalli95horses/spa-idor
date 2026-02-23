//================
// Import
//================
import { Injectable, NotFoundException } from '@nestjs/common';
import { Image } from './images.interface';


//================
// Service class
//================
@Injectable()
export class ImagesService {

  private images: Image[] = [];

  randomID(){
    return btoa(String(Math.random())).substring(2,20).toLocaleLowerCase();
  }

  randomBoolean(){
    return Math.random() < 0.5;
  }

  generateImages(): Image[] {
    return [
      { id: this.randomID(), label: "red", is_premium: this.randomBoolean() },
      { id: this.randomID(), label: "blue", is_premium: this.randomBoolean() },
      { id: this.randomID(), label: "green", is_premium: this.randomBoolean() },
      { id: this.randomID(), label: "yellow", is_premium: this.randomBoolean() },
      { id: this.randomID(), label: "pink", is_premium: this.randomBoolean() },
      { id: this.randomID(), label: "orange", is_premium: this.randomBoolean()}
    ];
  }


  getAllImages() {
    this.images = this.generateImages();
    return this.images.map((i: Image) => {
      const image = {...i};
      delete image.label;
      return image; 
    });
  }


  getImage(label: string, id: string,) {
    /* 
    The images are exposed to an endpoint that is NOT disclosed in HTTP messages. The endpoint:
     - is a combination of label and IDs (`/api/images/:label/:id`)
     - is known indipendently by the front-end and the back-end
     - the front-end knows the labels in advance and obtains the IDs after reading `/api/images`
    */
    const img = this.images.find(i => i.id === id && i.label === label);
    
    if (img?.id) {
      return {
        ...img,
        content: (img.is_premium) ? 'secret content' : 'free content'
      }
    }
    throw new NotFoundException(`Image with label ${label} and ID ${id} not found`);
  }
}
