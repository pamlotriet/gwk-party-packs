import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class BlobService {
  private account = 'OkFoodsNapier';
  private containerName = 'gwk';
  private sasToken = '';

  private blobServiceClient = new BlobServiceClient(
    `https://${this.account}.blob.core.windows.net?${this.sasToken}`
  );

  async listImageUrls(
    subfolder?: string,
    specialdays?: string
  ): Promise<string[]> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const imageUrls: string[] = [];

    let prefix = '';
    if (subfolder && specialdays) {
      prefix = `${subfolder}/${specialdays}/`;
    } else if (subfolder) {
      prefix = `${subfolder}/`;
    }

    for await (const blob of containerClient.listBlobsFlat({ prefix })) {
      const url = `https://${this.account}.blob.core.windows.net/${this.containerName}/${blob.name}`;
      imageUrls.push(url);
    }

    return imageUrls;
  }
}
