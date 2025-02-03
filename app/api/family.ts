import instance from ".";

interface Family {
    name: string;
    members: string[];
    drivers: string[];
    admins?: string[];
}

export const getAllFamilies = async () => {
    const response = await instance.get('/family');
    return response.data;
}

export const getFamilyByUserId = async (userId: string) => {
    const response = await instance.get(`/family/${userId}`);
    return response.data;
}

export const createFamily = async (family: Family) => {
    const response = await instance.post('/family', family);
    return response.data;
}


