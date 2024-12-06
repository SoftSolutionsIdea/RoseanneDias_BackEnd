export async function createOrUpdate<T extends { id: number }>(
  model: any,
  where: any,
  createData: any,
): Promise<T> {
  let record = await model.findUnique({ where })

  if (!record) {
    record = await model.create({ data: createData })
  } else {
    // Se o registro existir, retorna o existente
    record = await model.update({
      where,
      data: createData,
    })
  }

  return record as T
}
