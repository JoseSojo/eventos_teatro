
import fileSchema from '../schema/file.schema';
import { CreateFile } from '../types/file.interface';

export const NewFile = async (file: CreateFile) => {
    
    const newfile = new fileSchema(file);
    const result = await newfile.save();

    return result;
}

