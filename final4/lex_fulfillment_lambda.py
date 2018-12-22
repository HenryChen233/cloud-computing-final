import json
import boto3
def dispatch(event):
    client = boto3.client('dynamodb')
    intent_name = event['currentIntent']['name']
    if intent_name == "rentout":
        slot = event['currentIntent']['slots']
        item = {}
        contact_info = {}
        contact_info['S'] = slot['contact_info']
        item['contact_info'] = contact_info
        location = {}
        location['S'] = slot['location']
        item['location'] = location
        price = {}
        price['N'] = slot['price']
        item['price'] = price
        style = {}
        style['S'] = slot['style']
        item['style'] = style
        wechat = {}
        wechat['S'] = slot['wechat']
        item['wechat'] = wechat
        email = {}
        email["S"] = slot['wechat']
        item['email'] = email
        start_date = {}
        start_date['S'] = slot['start_date']
        item['start_date'] = start_date
        end_date = {}
        end_date['S'] = slot['end_date']
        item['end_date'] = end_date
        size = {}
        size['N'] = slot['size']
        item['size'] = size
        client.put_item(TableName = 'rentinfo', Item = item)
        return {"dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Your Message has been recorded"
                }
            }
        }
    elif intent_name == 'rentAparment':
        slot = event['currentIntent']['slots']
        price = slot['price'];
        start_date = slot['start_date']
        end_date = slot['end_date']
        size = slot['size']
        style = slot['style']
        dyn = boto3.client('dynamodb')
        res = client.scan(
                ExpressionAttributeNames={
                    '#style': 'style'
                },
                ExpressionAttributeValues={
                    ':sd': {
                        'S': start_date
                    },
                    ':pr': {
                        'N': price
                    },
                    ':ed': {
                        'S': end_date
                    },
                    # ':lo': {
                    #     'S': event['location']
                    # },
                    ':st': {
                        'S': style
                    },
                    ':si': {
                        'N': size
                    }
                },
                Select= 'ALL_ATTRIBUTES',
                FilterExpression= 'price <= :pr and start_date <= :sd and end_date >= :ed and #style = :st and size >= :si',
                TableName='rentinfo'
        )
        l = res['Items']
        result = "Here is your suggestion"
        if len(l) == 0:
            result = "No matching result"
        else :
            result += l[0]["location"]["S"] + " in the price of " + str(l[0]["price"]["N"]) + ", and you could contact " + str(l[0]["contact_info"]["S"])
        url = "https://s3-us-west-2.amazonaws.com/photolx/" + l[0]['photo_ID']['S'] + ".jpg"
        return {"dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": result
                },
                "responseCard":{
                    "contentType": "application/vnd.amazonaws.card.generic",
                    "genericAttachments":[
                        {"title":"Your Recommendation",
                        "subTitle":"Your Photo",
                        "imageUrl":url}
                        ]
                }
            }
        }
    else:
        return {"dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Sorry I cannnot understand"
                }
            }
        }
    
    
def lambda_handler(event, context):
    # TODO implement
    response = dispatch(event)
    
    return response