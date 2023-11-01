import { Injectable } from '@angular/core';
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  constructor() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    return image.webPath;
  }
}
