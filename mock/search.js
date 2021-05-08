export default {
  'GET /api/getLists': {
    lists: ['a', 'b', 'c'],
  },
  'GET /api/getListsAsync': (req, res) => {
    console.log('mock req:', req);
    setTimeout(() => {
      res.json({
        // lists: Array(10).fill(req.query.value),
        status: 200,
        data: Array(10).fill(req.query.value),
        // status: 500,
        // errMsg: 'test err',
      });
    }, 1000);
  },
};
