import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import type {
  Model as BaseModel,
  ModelGenerateImage,
  ModelGenerateMessages,
  ModelRequest,
} from "./types";

export type Model = BaseModel<ModelMessageFormat>;
export type ModelMessageFormat = ChatCompletionRequestMessage;
export type ModelConfig = {
  apiKey: string;
  organization: string;
  temperature: number;
  model?:
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-16k"
    | "gpt-3.5-turbo-16k-0613"
    | "gpt-4";
};

export const create = function createModel(config: ModelConfig): Model {
  return {
    generateMessages,
    generateImage: createGenerateImages(config),
    request: createRequest(config),
  };
};

export const generateMessages: ModelGenerateMessages<ModelMessageFormat> = (
  messages
) => {
  return messages.map(([role, content]) => ({ role, content }));
};

const createRequest = (config: ModelConfig): ModelRequest<ModelMessageFormat> =>
  async function request({ messages }) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${config.apiKey}`,
        "OpenAI-Organization": config.organization,
      },
      body: JSON.stringify({
        model: config.model || "gpt-3.5-turbo",
        messages,
        temperature: config.temperature,
      }),
    });

    if (!response.ok) {
      let errorType = "ai.generic_error";

      if ([401, 429, 500, 503].includes(response.status)) {
        errorType =
          OpenAIErrors[response.status as 401 | 429 | 500 | 503][
            response.statusText
          ] || "ai.generic_error";
      }

      return {
        success: false,
        type: errorType,
        status: response.status,
        message: response.statusText,
      };
    }

    const completion: CreateChatCompletionResponse = await response.json();

    return {
      success: true,
      choices: completion.choices.map(
        (choice) => choice?.message?.content || ""
      ),
    };
  };

const OpenAIErrors: Record<401 | 429 | 500 | 503, { [key in string]: string }> =
  {
    401: {
      "Invalid Authentication": "ai.invalid_auth",
      "Incorrect API key provided": "ai.invalid_apiKey",
      "You must be a member of an organization to use the API": "invalid_org",
    },
    429: {
      "Rate limit reached for requests": "ai.rate_limit",

      "You exceeded your current quota, please check your plan and billing details":
        "ai.quota_exceed",
    },
    500: {
      "The server had an error while processing your request":
        "ai.generic_error",
    },
    503: {
      "The engine is currently overloaded, please try again later":
        "ai.overloaded",
    },
  };

const createGenerateImages = (config: ModelConfig): ModelGenerateImage =>
  async function generateImage(prompt: string) {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${config.apiKey}`,
          "OpenAI-Organization": config.organization,
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: "512x512",
          response_format: "url",
        }),
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    });

    return response.data[0].url;
  };
