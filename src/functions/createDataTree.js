const createDataTree = (dataset) => {
  const hashTable = Object.create(null);
  dataset.forEach((aData) => (hashTable[aData.databaseId] = { ...aData, childNodes: [] }));
  const dataTree = [];
  dataset.forEach((aData) => {
    // Items whose parent is missing (e.g. unpublished) are promoted to the root instead of crashing.
    const parent = aData.parentDatabaseId ? hashTable[aData.parentDatabaseId] : null;
    if (parent) parent.childNodes.push(hashTable[aData.databaseId]);
    else dataTree.push(hashTable[aData.databaseId]);
  });
  return dataTree;
};

export default createDataTree;