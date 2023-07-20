import type { ChainMessages } from "../chains";
import type { ErrorResponse } from "../types";

export type ModelGenerateMessages<ModelMessage> = (
  messages: ChainMessages
) => ModelMessage[];

export type ModelGenerateImage = (prompt: string) => Promise<string>;

export type ModelRequestSuccess = {
  success: true;
  choices: string[];
};

export type ModelRequest<ModelMessageFormat> = ({
  messages,
}: {
  messages: ReturnType<ModelGenerateMessages<ModelMessageFormat>>;
}) => Promise<ModelRequestSuccess | ErrorResponse>;

export type Model<ModelMessageFormat> = {
  generateMessages: ModelGenerateMessages<ModelMessageFormat>;
  generateImage: ModelGenerateImage;
  request: ModelRequest<ModelMessageFormat>;
};
