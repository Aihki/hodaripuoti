const listAllOrders = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM hod_orders`);
    return rows;
  } catch (e) {
    console.error('listAllOrders', e.message);
  }
};

export { listAllOrders };
