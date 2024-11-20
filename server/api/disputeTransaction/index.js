const sharetribeSdk = require('sharetribe-flex-sdk');
const { handleError, serialize, getISdk } = require('../../api-util/sdk');

const { types } = sharetribeSdk;
const { UUID } = types;

const integrationSdk = getISdk();

module.exports = async (req, res) => {
  const { id, disputeAmount, disputeReason } = req.body;

  try {
    const apiResponse = await integrationSdk.transactions.updateMetadata(
      {
        id: new UUID(id),
        metadata: {
          disputeAmount,
          disputeReason,
        },
      },
      {
        expand: true,
      }
    );

    const { status, statusText, data } = apiResponse;
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
  } catch (e) {
    handleError(res, e);
  }
};
