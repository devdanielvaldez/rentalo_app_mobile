const { serialize, handleError, getISdk } = require('../../api-util/sdk');

const sdk = getISdk();

module.exports = async (req, res) => {
  const { listingId } = req.body;

  try {
    let totalPages;
    let page = 1;
    let perPage = 100;
    let response = {
      status: 200,
      statusText: 'OK',
      data: {
        data: [],
        included: [],
      },
    };

    while (!totalPages || totalPages >= page) {
      const transactions = await sdk.transactions.query(
        {
          listingId: listingId.uuid,
          page,
          perPage,
          include: ['booking'],
        },
        {
          expand: true,
        }
      );

      response.status = transactions.status;
      response.statusText = transactions.statusText;
      response.data.data = response.data.data.concat(transactions.data.data);
      response.data.included = response.data.included.concat(transactions.data.included);

      page++;
      totalPages = transactions.data.meta.totalPages;
    }

    const { status, statusText, data } = response;

    res
      .status(status)
      .set('Content-Type', 'application/transit+json')
      .send(
        serialize({
          status,
          statusText,
          data,
        })
      )
      .end();
  } catch (err) {
    handleError(res, err);
  }
};
