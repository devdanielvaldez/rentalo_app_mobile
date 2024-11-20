const { ComplyCube } = require("@complycube/api");
const complycube = new ComplyCube({
    apiKey: process.env.COMPLYCUBE_KEY,
});

const methods = {
    createComplianceCheck: async (req, res) => {

        const { userData } = req.body;
        const { email, firstName, lastName, userID, userType } = userData;
        try {

            const allClients = await complycube.client.list();
            const existingClient = allClients.find(client => 
                client.email === email && client.metadata.userType === userType
            );

            if (existingClient) {
                let clientId = existingClient.id;
                const token = await complycube.token.generate(clientId, {
                    referrer: "*://*/*"
                });

                return res
                    .status(200)
                    .send({ token, clientId });
            } else {
                const { id: clientId } = await complycube.client.create({
                    type: "person",
                    email: email,
                    personDetails: {
                        firstName: firstName,
                        lastName: lastName,
                    },
                    metadata: {
                        userID,
                        userType
                    }
                });
    
                if (clientId) {
                    const token = await complycube.token.generate(clientId, {
                        referrer: "*://*/*"
                    });
    
                    return res
                        .status(200)
                        .send({ token, clientId });
                }
            }
        } catch (error) {
            res
                .status(400)
                .send({ error })
                .end();
        }
    },

    createCheck: async (req, res) => {
        const { clientId, documentId, userID, userType } = req.body;

        try {
            const response = await complycube.check.create(clientId, {
                documentId,
                type: 'document_check',
                options: {
                    userID,
                    userType
                }
            });

            const check = await complycube.check.get(response.id);

            res
              .status(200)
              .send({ check })
              .end();
        } catch (error) {
            console.log(error, '*** *** => error');
            res
              .status(400)
              .send({ error })
              .end();
        }
    },
}

module.exports = methods;
