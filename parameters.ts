import { getWorkflowSubmissionUrl } from "./utils/getWorkflowSubmissionUrl";

// Sample parameters to test the nodemaker CLI or to replace with your own.

export const metaParameters: MetaParameters = {
  serviceName: "Nodemaker News",
  authType: "OAuth2",
  nodeColor: "#ff6600",
  apiUrl: "http://api.nodemaker.com/",
};

export const regularNodeParameters: RegularNodeParameters = {
  Article: [
    {
      name: "Get",
      description: "Get a Nodemaker News article",
      endpoint: "articles/:articleId",
      requestMethod: "GET",
      fields: [
        {
          name: "Article ID",
          description: "The ID of the Nodemaker News article to be returned",
          type: "string",
          default: "",
        },
        {
          name: "Additional Fields",
          type: "collection",
          default: {},
          options: [
            {
              name: "Include comments",
              type: "boolean",
              default: false,
              description: "Whether to include all the comments in the article",
            },
          ],
        },
      ],
    },
    {
      name: "Get All",
      description: "Get all Nodemaker News articles",
      endpoint: "search?",
      requestMethod: "GET",
      fields: [
        {
          name: "Return All",
          description: "Whether to return all results or only up to a limit",
          type: "boolean",
          default: false,
        },
        {
          name: "Limit",
          description:
            "Limit of Nodemaker News articles to be returned for the query",
          type: "number",
          default: 5,
          extraDisplayRestriction: { "Return All": true },
        },
        {
          name: "Additional Fields",
          type: "collection",
          default: {},
          options: [
            {
              name: "Keyword",
              description: "The keyword for filtering the results of the query",
              type: "multiOptions",
              default: "",
              options: [
                {
                  name: "Feature1",
                  description: "Some description",
                },
                {
                  name: "Feature2",
                  description: "Some other description",
                },
              ],
            },
            {
              name: "Tags",
              description: "Tags for filtering the results of the query",
              type: "multiOptions",
              default: {},
              options: [
                {
                  name: "Story",
                  description: "Returns query results filtered by story tag",
                },
                {
                  name: "Comment",
                  description: "Returns query results filtered by comment tag",
                },
                {
                  name: "Poll",
                  description: "Returns query results filtered by poll tag",
                },
                {
                  name: "Show Nodemaker News",
                  description: "Returns query results filtered by Show HN tag",
                },
                {
                  name: "Ask Nodemaker News",
                  description: "Returns query results filtered by Ask HN tag",
                },
                {
                  name: "Front Page",
                  description:
                    "Returns query results filtered by Front Page tag",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  User: [
    {
      name: "Get",
      description: "Get a Nodemaker News user",
      endpoint: "users/:username",
      requestMethod: "GET",
      fields: [
        {
          name: "Username",
          description: "The Nodemaker News user to be returned",
          type: "string",
          default: "",
        },
      ],
    },
  ],
};

export const docsParameters: DocsParameters = {
  serviceName: "Nodemaker News",
  serviceUrl: "https://news.ycombinator.com",
  introDescription:
    "a social news website focusing on computer science and entrepreneurship",
  exampleUsage: "get an article from Nodemaker News",
  workflowUrl: getWorkflowSubmissionUrl(),
};

export const triggerNodeParameters: TriggerNodeParameters = {
  webhookEndpoint: "/automations/hooks",
  webhookProperties: [
    {
      displayName: "Event",
      name: "event",
      type: "options",
      required: true,
      default: "subscriberActivated",
      description:
        "The events that can trigger the webhook and whether they are enabled.",
      options: [
        {
          name: "Subscriber Activated",
          value: "subscriberActivated",
          description:
            "Whether the webhook is triggered when a subscriber is activated.",
        },
        {
          name: "Link Clicked",
          value: "linkClicked",
          description:
            "Whether the webhook is triggered when a link is clicked.",
          fields: [
            {
              displayName: "Initiating Link",
              name: "link",
              type: "string",
              required: true,
              default: "",
              description: "The URL of the initiating link",
            },
          ],
        },
      ],
    },
  ],
};
