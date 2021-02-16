import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
      "TableName": "notes",
      "KeyConditionExpression": "userId = :v_userId",
      "FilterExpression": "promptId = :v_promptId",
      "ExpressionAttributeValues": {
          ":v_userId" : event.requestContext.identity.cognitoIdentityId,
          ":v_promptId" : event.pathParameters.id
      }
  };
  const result = await dynamoDb.query(params);
  console.log("Result from video=" + result.Items[0].attachment);
  if ( ! result.Items[0]) {
    return undefined;
//    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Items[0];
});


