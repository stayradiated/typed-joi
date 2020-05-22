import * as Joi from "@hapi/joi";

import { Endpoint } from "./types";

const myRouteSchema = {
  params: Joi.object().keys({
    projectId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    withData: Joi.array().items(Joi.string()),
  }),
};

const myRoute: Endpoint<typeof myRouteSchema> = {
  handler: async (req, res) => {
    const { projectId } = req.params;
    const { withData } = req.query;
  },
};

export default myRoute;
