const axios = require("axios");

/** 
    Example function for writing to a Google Sheet with Workflows
    `workflowPayload` contains the object sent to the workflow URL

    This is what the data object looks like:
    {
        "integrationMetadata": {
            "sheetId": "YOUR_SHEET_ID",
            "sheetTitle": "YOUR_SHEET_TITLE"
        },
        "auth": {
            "oauthToken": "TOKEN"
        }, 
        "workflowPayload": {
            "name": "John Doe",
            "email": ".."
        }
    }
**/
exports.handler = async (data, context) => {
  try {
    const { integrationMetadata, auth, workflowPayload } = data;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${integrationMetadata.sheetId}/values/${integrationMetadata.sheetTitle}:append?valueInputOption=USER_ENTERED`;

    const headers = {
      Authorization: `Bearer ${auth.oauthToken}`,
      "Content-Type": "application/json",
    };

    const newLine = {
      values: [Object.values(workflowPayload)],
    };

    await axios.post(url, newLine, { headers });
    return {
      message: "Sheet updated successfully",
    };
  } catch (error) {
    console.error("Error updating sheet: ", error);
    return {
      error: error.message
    };
  }
};
