import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('VisitorCount')

def lambda_handler(event, context):
    # Increment the counter atomically
    response = table.update_item(
        Key={'id': 'site-visitors'},
        UpdateExpression='SET #count = if_not_exists(#count, :start) + :inc',
        ExpressionAttributeNames={'#count': 'count'},
        ExpressionAttributeValues={':inc': 1, ':start': 0},
        ReturnValues='UPDATED_NEW'
    )

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'visitor_count': int(response['Attributes']['count'])})
    }
