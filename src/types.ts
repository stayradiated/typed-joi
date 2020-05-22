import * as Joi from "@hapi/joi";
import "joi-extract-type";

import { Response } from "express";

import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
} from "express-joi-validation";

export interface Schema {
  [ContainerTypes.Body]?: Joi.mappedSchema;
  [ContainerTypes.Fields]?: Joi.mappedSchema;
  [ContainerTypes.Headers]?: Joi.mappedSchema;
  [ContainerTypes.Params]?: Joi.mappedSchema;
  [ContainerTypes.Query]?: Joi.mappedSchema;
}

interface ExtractedSchema<S extends Schema> extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<S[ContainerTypes.Body]>;
  [ContainerTypes.Fields]: Joi.extractType<S[ContainerTypes.Fields]>;
  [ContainerTypes.Headers]: Joi.extractType<S[ContainerTypes.Headers]>;
  [ContainerTypes.Params]: Joi.extractType<S[ContainerTypes.Params]>;
  [ContainerTypes.Query]: Joi.extractType<S[ContainerTypes.Query]>;
}

interface Request<VRS extends ValidatedRequestSchema>
  extends ValidatedRequest<VRS> {}

export interface Endpoint<S extends Schema> {
  schema: S;
  handler(req: Request<ExtractedSchema<S>>, res?: Response): void;
}
