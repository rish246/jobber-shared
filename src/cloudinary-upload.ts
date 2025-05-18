import cloudinary, { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';

const uploadImagePromise = (image: string, options: UploadApiOptions = {}): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, options, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
}
export const uploadImage = async (image: string, options: UploadApiOptions = {}): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
    try {
        const result = await uploadImagePromise(image, {
            resource_type: 'auto',
            ...options,
        });
        return result;
    } catch (error) {
        return error as UploadApiErrorResponse;
    }
}

export const uploadVideo = async (video: string, options: UploadApiOptions = {}): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
    try {
        const result = await uploadImagePromise(video, {
            resource_type: 'video',
            chunk_size: 6000000,
            ...options,
        });
        return result;
    } catch (error) {
        return error as UploadApiErrorResponse;
    }
}