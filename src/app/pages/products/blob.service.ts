import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class BlobService {
  private account = 'OkFoodsNapier';
  private containerName = 'gwk';
  private sasToken = ''; // or leave blank if public container

  private blobServiceClient = new BlobServiceClient(
    `https://${this.account}.blob.core.windows.net?${this.sasToken}`
  );

  async listImageUrls(): Promise<string[]> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const imageUrls: string[] = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      const url = `https://${this.account}.blob.core.windows.net/${this.containerName}/${blob.name}`;
      imageUrls.push(url);
    }

    return imageUrls;
  }
}
