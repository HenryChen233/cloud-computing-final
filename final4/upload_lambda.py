import json
import boto3
def lambda_handler(event, context):
    message = event["message"]
    photo_ID = event["photo_ID"]
    location = event["location"]
    contact = event["contact_info"]
    start_date = event["start_date"]
    end_date = event["end_date"]
    size = event['size']
    price = event['price']
    email = event['email']
    style = event['style']
    client = boto3.client('dynamodb')
    client.put_item(
        Item={
        'contact_info': {
            'S': contact,
            },
        'location': {
            'S': location,
            },
        'message': {
            'S': message,
            },
        'photo_ID':{
                'S':photo_ID,
            },
        'price':{
            "N":price,
        },
        'email':{
            "S":email,
        },
        'start_date':{
            "S":start_date,
        },
        "end_date":{
            "S":end_date,
        },
        "size":{
            "N":size,
        },
        "style":{
            "S":style,
        },
        }
        ,
        TableName='rentinfo',
    )
    return {
        'statusCode': 200,
        'body': json.dumps([message, photo_ID, location,contact])
    }
