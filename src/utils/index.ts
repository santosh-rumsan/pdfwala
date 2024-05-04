import * as fs from 'fs';
import * as path from 'path';

export function listFilesInFolderByExtensions(
  targetFolder: string,
  extensions: string[],
  recursive: boolean = false,
): string[] {
  const files: string[] = [];

  // Validate if targetFolder exists
  if (!fs.existsSync(targetFolder))
    throw new Error(`Folder ${targetFolder} does not exist`);

  // Iterate through the files in the folder
  const folderItems = fs.readdirSync(targetFolder);
  folderItems.forEach((item) => {
    const itemPath = path.join(targetFolder, item);
    const stats = fs.statSync(itemPath);

    // Check if it's a file
    if (stats.isFile()) {
      // Check if file has one of the specified extensions
      const fileExtension = path.extname(item).toLowerCase();
      if (extensions.includes(fileExtension)) {
        files.push(itemPath);
      }
    }
    // If it's a directory, recursively call this function
    else if (recursive && stats.isDirectory()) {
      const subFolderFiles = listFilesInFolderByExtensions(
        itemPath,
        extensions,
      );
      files.push(...subFolderFiles);
    }
  });

  return files;
}

export function listFontsFromFolder(
  fontsDir: string,
): Record<string, Record<string, string>> {
  const fontFamilies = {};

  // Read the contents of the fonts directory
  const fontDirs = fs.readdirSync(fontsDir);

  // Iterate over each font directory
  fontDirs.forEach((fontDir) => {
    const fontFamily = fontDir;

    // Initialize an object to store font styles for this font family
    fontFamilies[fontFamily] = {
      normal: '',
      italics: '',
      bold: '',
      bolditalics: '',
    };

    // Read the contents of the font directory
    const fontFiles = fs.readdirSync(path.join(fontsDir, fontDir));

    // Iterate over each font file
    fontFiles.forEach((fontFile) => {
      // Extract font style from the font file name
      const fontStyle = path
        .basename(fontFile, path.extname(fontFile))
        .toLowerCase();

      // Map font style to font file path
      if (fontStyle.includes('regular') || fontStyle.includes('normal')) {
        fontFamilies[fontFamily].normal = path.join(
          fontsDir,
          fontFamily,
          fontFile,
        );
      } else if (
        fontStyle.includes('bolditalic') ||
        fontStyle.includes('bolditalics')
      ) {
        fontFamilies[fontFamily].bolditalics = path.join(
          fontsDir,
          fontFamily,
          fontFile,
        );
      } else if (fontStyle.includes('bold')) {
        fontFamilies[fontFamily].bold = path.join(
          fontsDir,
          fontFamily,
          fontFile,
        );
      } else if (
        fontStyle.includes('italic') ||
        fontStyle.includes('italics')
      ) {
        fontFamilies[fontFamily].italics = path.join(
          fontsDir,
          fontFamily,
          fontFile,
        );
      }
    });
    if (!fontFamilies[fontFamily].bolditalics)
      fontFamilies[fontFamily].bolditalics = fontFamilies[fontFamily].normal;
    if (!fontFamilies[fontFamily].italics)
      fontFamilies[fontFamily].italics = fontFamilies[fontFamily].normal;
    if (!fontFamilies[fontFamily].bold)
      fontFamilies[fontFamily].bold = fontFamilies[fontFamily].normal;
    if (!fontFamilies[fontFamily].normal) delete fontFamilies[fontFamily];
  });

  return fontFamilies;
}

export function saveFontsToJsonFile(jsonFilePath: string, fonts: object): void {
  if (!fs.existsSync(jsonFilePath))
    fs.writeFileSync(jsonFilePath, '{}', 'utf-8');

  // Read the JSON file
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const jsonData = JSON.parse(data);

  // Write the JSON data back to the file
  fs.writeFileSync(
    { ...jsonData, ...fonts },
    JSON.stringify(jsonData, null, 2),
    'utf-8',
  );
}
