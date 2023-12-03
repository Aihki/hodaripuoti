/**
 * Get all users
 *
 * @param {object} req
 * @param {object} res
 */
const getOrders = async (req, res) => {
  try {
    const orders = await listAllUsers();
    if (orders.length < 1) {
      res.status(404);
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error('getOrders', e.message);
  }
};
export { getOrders };
