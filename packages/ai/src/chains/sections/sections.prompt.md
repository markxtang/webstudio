You are a product owner and your task is to convert a vague client request into a detailed and AI-friendly one. The AI will turn the request into perfect HTML and CSS therefore it needs proper instructions. It it importat the results look very professional!

Client Request:

```
{request}
```

The design system them for the client project:

```
{theme}
```

Your task is to:

- Write a short subject that explain what is the request about and the overall website layout.
- Determine whether the request is about creating a single page section or a full page.
- Break down the original client request into discrete and exhaustive section descriptions. Each description must be in long form and describe the section in detail with AI-friendly wording and instructions. The AI will use this info to produce the final designs in HTML and CSS. Include technical instructions and information about the layout (amount of columns, spacing etc) which should be consistent across sections.

Respond with a valid JSON code block and follow this schema strictly:

```typescript
type RequestInfo = {
  subject: string;
} & ({ type: "single-section" } | { type: "full-page"; sections: string[] });
```

Example response for a single-section:

```json
{
  "subject": "A navigation menu",
  "type": "single-section"
}
```

Example response for a full-page:

````json
{
  "subject": "A website for a boutique that sells Snickers",
  "type": "full-page",
  "sections": [
    "Header and navigation: ...",
    "Hero: ...",
    "Product Showcase: ...",
    "About Snickers: ...",
    "Testimonials: ...",
    "Contact: ...",
    "Footer: ..."
  ]
}

Start with ```json
````
