import * as dynamoose from 'dynamoose';
import { IndexType } from 'dynamoose/dist/Schema';

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
    type: String,
    required: true,
  },
});

export const Interaction = dynamoose.model('Interaction', interactionSchema);