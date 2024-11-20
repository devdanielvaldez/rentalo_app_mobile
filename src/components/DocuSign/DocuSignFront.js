import React, { Component } from 'react';
import axios from 'axios';
import { docu } from '../../util/api';

class DocuSignIntegration extends Component {
    state = {
        envelopeId: null,
        recipient1Email: 'Sunil@yopmail.com',
        recipient1Name: 'Sunil',
        recipient2Email: 'ok@yopmail.com',
        recipient2Name: 'OK',
        isLoading: false,
    };

    handleRecipient1EmailChange = (e) => {
        this.setState({ recipient1Email: e.target.value });
    };

    handleRecipient1NameChange = (e) => {
        this.setState({ recipient1Name: e.target.value });
    };

    handleRecipient2EmailChange = (e) => {
        this.setState({ recipient2Email: e.target.value });
    };

    handleRecipient2NameChange = (e) => {
        this.setState({ recipient2Name: e.target.value });
    };

    getAccessToken = async () => {
        try {
            const clientId = '6d36d757-7c01-4b11-a500-de4e31594a09';
            const clientSecret = '11133eeb-20e7-4695-a2d2-0668d0b553dd';

            const tokenUrl = 'https://account-d.docusign.com/oauth/token';

            const data = new URLSearchParams();
            data.append('grant_type', 'client_credentials');
            data.append('client_id', clientId);
            data.append('client_secret', clientSecret);

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            const response = await axios.post(tokenUrl, data, config);
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    };

    handleSendRequest = async () => {
        const {
            recipient1Email,
            recipient1Name,
            recipient2Email,
            recipient2Name,
        } = this.state;
        const accessToken = await this.getAccessToken();

        // Construct your envelope JSON payload for sending the document to both recipients
        const envelopeData = {
            recipients: [
                {
                    email: recipient1Email,
                    name: recipient1Name,
                    role: 'signer',
                    tabs: {
                        signHereTabs: [
                            {
                                anchorString: 'Recipient1Signature:',
                                anchorXOffset: '0',
                                anchorYOffset: '0',
                            },
                        ],
                    },
                },
                {
                    email: recipient2Email,
                    name: recipient2Name,
                    role: 'signer',
                    tabs: {
                        signHereTabs: [
                            {
                                anchorString: 'Recipient2Signature:',
                                anchorXOffset: '0',
                                anchorYOffset: '0',
                            },
                        ],
                    },
                },
            ],
            documents: [
                {
                    documentBase64: '<YOUR_BASE64_ENCODED_DOCUMENT>',
                    name: 'contract.pdf',
                    fileExtension: 'pdf',
                    documentId: '1',
                },
            ],
            emailSubject: 'Please sign this document',
        };

        try {
            this.setState({ isLoading: true });

            // Make a POST request to the DocuSign API to send the signature request
            const response = await axios.post(
                'https://demo.docusign.net/restapi/v2/accounts/9b8d4ea7-41c0-4b01-823c-3b1a2a96a3a8/envelopes',
                envelopeData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            this.setState({ envelopeId: response.data.envelopeId });
        } catch (error) {
            console.error('Error sending DocuSign request:', error);
        } finally {
            this.setState({ isLoading: false });
        }
    };
    docuFuc = async () => {
       const rr =  await docu()
    }

    render() {
        const {
            recipient1Email,
            recipient1Name,
            recipient2Email,
            recipient2Name,
            envelopeId,
            isLoading,
        } = this.state;

        return (
            <div>
                <h2>DocuSign Integration</h2>
                <div>
                    <label>Recipient 1 Email:</label>
                    <input
                        type="email"
                        value={recipient1Email}
                        onChange={this.handleRecipient1EmailChange}
                    />
                    <label>Recipient 1 Name:</label>
                    <input
                        type="text"
                        value={recipient1Name}
                        onChange={this.handleRecipient1NameChange}
                    />
                </div>
                <div>
                    <label>Recipient 2 Email:</label>
                    <input
                        type="email"
                        value={recipient2Email}
                        onChange={this.handleRecipient2EmailChange}
                    />
                    <label>Recipient 2 Name:</label>
                    <input
                        type="text"
                        value={recipient2Name}
                        onChange={this.handleRecipient2NameChange}
                    />
                </div>
                <button onClick={this.docuFuc} disabled={isLoading}>
                    Send Signature Request
                </button>
                {envelopeId && (
                    <p>Signature request sent. Envelope ID: {envelopeId}</p>
                )}
            </div>
        );
    }
}

export default DocuSignIntegration;
