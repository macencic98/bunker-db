
import { IndexType, Schema } from 'dynamoose/dist/Schema';
const dynamoose = require('dynamoose'); 

const interactionSchema = new dynamoose.Schema({
  campaign_tag: {
    type: String,
    hashKey: true,
  },
  id: {
    type: String,
    rangeKey: true,
  },
  interaction_type_tag: {
    type: String,
    required: true,
  },
  platform_tag: {
    type: String,
    required: true,
    index: {
      name: 'platformIndex',
      type: IndexType.local
    },
  },
  user_info: {
    type: Object,
    required: true,
  },
});

export const Interaction = dynamoose.model('Interaction', interactionSchema);