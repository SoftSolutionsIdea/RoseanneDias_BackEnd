export async function createOrUpdate<T extends { id: number }>(
    model: any, 
    where: any,
    createData: any 
): Promise<T> {
    let record = await model.findUnique({ where });

    if (!record) {
        record = await model.create({ data: createData });
    }

    return record as T; 
}