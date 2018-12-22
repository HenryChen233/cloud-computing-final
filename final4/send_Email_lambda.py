import json
import boto3
def lambda_handler(event, context):
    # TODO implement
    receiver  = event['receiver']
    sender = event['sender']
    message = event['message']
    
    sesclient = boto3.client('ses')
    response = sesclient.send_email(
        Source=sender,
        Destination = {
            'ToAddresses': [
            receiver,
        ],
        'CcAddresses': [
            'xh2374@columbia.edu',
            'xc2452@columbia.edu'
        ]
        },
        Message={
            "Subject":{
                "Data":"New Notification from xc2452" + sender,
                'Charset':"UTF-8"
            },
            "Body":{
                "Text":{
                    "Data":message,
                    "Charset":"UTF-8"
                }
            }
        }
        )
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
