const AWS = require('aws-sdk');

const dynamoDB = new AWS.AWS.DynamoDB({
  endpoint: 'dynamodb:8000',
  region: 'us-west-2',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const params = {
  TableName: 'Interaction',
  KeySchema: [
    { AttributeName: 'campaign_tag', KeyType: 'HASH' }, 
    { AttributeName: 'id', KeyType: 'RANGE' }           
  ],
  AttributeDefinitions: [
    { AttributeName: 'campaign_tag', AttributeType: 'S' },
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'platform_tag', AttributeType: 'S' },
    { AttributeName: 'user_info', AttributeType: 'S' }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: 'platformIndex',
      KeySchema: [
        { AttributeName: 'campaign_tag', KeyType: 'HASH' }, 
        { AttributeName: 'platform_tag', KeyType: 'RANGE' } 
      ],
      Projection: {
        ProjectionType: 'ALL'
      }
    }
  ]
};

dynamoDB.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
