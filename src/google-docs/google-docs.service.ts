import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import * as path from 'path';

@Injectable()
export class GoogleDocsService {
  private drive: drive_v3.Drive;

  constructor() {
    const keyFilePath = path.join(
      './',
      'config',
      'google-service-account.json',
    );
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: [
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async getAllDocuments(): Promise<
    { id: string; name: string; url: string }[]
  > {
    const response = await this.drive.files.list({
      q: "mimeType='application/vnd.google-apps.document'",
      fields: 'files(id, name, webViewLink)',
    });

    return response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      url: file.webViewLink,
    }));
  }

  async createDocument(title: string): Promise<{ name: string; url: string }> {
    const file = await this.drive.files.create({
      requestBody: {
        name: title,
        mimeType: 'application/vnd.google-apps.document',
      },
      fields: 'id, name, webViewLink',
    });

    const fileId = file.data.id;

    await this.drive.permissions.create({
      fileId,
      requestBody: {
        role: 'writer',
        type: 'anyone',
      },
    });

    return {
      name: file.data.name,
      url: `https://docs.google.com/document/d/${fileId}`,
    };
  }

  async getDocument(fileId: string): Promise<{ name: string; url: string }> {
    const file = await this.drive.files.get({
      fileId,
      fields: 'name, webViewLink',
    });

    return {
      name: file.data.name,
      url: file.data.webViewLink,
    };
  }

  async deleteDocument(fileId: string): Promise<{ message: string }> {
    await this.drive.files.delete({ fileId });
    return { message: 'Google документ удален' };
  }
}
