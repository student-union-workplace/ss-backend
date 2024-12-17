import { Injectable } from '@nestjs/common';
import { google, sheets_v4, drive_v3 } from 'googleapis';
import * as path from 'path';

@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private drive: drive_v3.Drive;

  constructor() {
    console.log(__dirname);
    const keyFilePath = path.join(
      './',
      'config',
      'google-service-account.json',
    );
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async createSheet(title: string): Promise<{ id: string; url: string }> {
    const response = await this.sheets.spreadsheets.create({
      requestBody: {
        properties: { title },
      },
    });

    const spreadsheetId = response.data.spreadsheetId;
    const spreadsheetUrl = response.data.spreadsheetUrl;

    await this.drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: 'writer',
        type: 'anyone',
      },
    });

    return {
      id: spreadsheetId,
      url: spreadsheetUrl,
    };
  }

  async getSheet(sheetId: string): Promise<any> {
    const response = await this.sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });
    return response.data;
  }

  async deleteSheet(fileId: string): Promise<{ message: string }> {
    await this.drive.files.delete({ fileId });
    return { message: 'Google Таблица удалена' };
  }
}
