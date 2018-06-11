import Model from './';
import uuid from 'uuid/v1';

import Joi from 'joi';

const challengeSchema = Joi.object().keys({
  name: Joi.string().min(4).max(12).required(),
  description: Joi.string().min(1).max(500).required(),
  hasCodeEditor: Joi.boolean(),
  requirements: Joi.object().keys({
    name: Joi.string().required(),
    tests: Joi.array().items(Joi.object().keys({
      input: Joi.array().items(Joi.any()).required(),
      output: Joi.any().required(),
    })).required(),
  }).required(),
  codeExample: Joi.string().empty().default('// Write your code here'),
  _id: Joi.any().forbidden().default(_ => uuid(), 'unique id'),
});

export { challengeSchema };

export default Model('challenge', challengeSchema);
