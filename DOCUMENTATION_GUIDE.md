# Documentation Guide

This guide explains the documentation process used in this project, the difference between JSDoc-generated documentation and other forms of documentation, and how to maintain the documentation going forward.

## My Documentation Process

My approach to documentation is to write it once, right in the code, and then use tools to generate it in different formats. This is often called "documentation as code."

1.  **JSDoc Comments:** I start by adding JSDoc comments to the source code. JSDoc is a markup language used to annotate JavaScript and TypeScript code. These comments are placed directly above the code they describe and use a specific syntax (e.g., `@param`, `@returns`, `@example`) to provide details about functions, classes, and variables.

2.  **Code-Level Documentation:** The primary goal of these comments is to make the code itself more readable and understandable for developers who are working on it. When you're looking at a function, you can immediately see what it does, what parameters it expects, and what it returns, without having to read through the entire function body.

3.  **Automated Documentation Generation:** Once the code is commented, I use a tool called `documentation.js` to parse these JSDoc comments and generate documentation in different formats. In this project, I've configured it to generate:
    *   **HTML:** A user-friendly, browsable website that's easy to navigate. This is what we'll use for the GitHub Pages site.
    *   **Markdown:** A plain-text format that's easy to read and can be included in other documents, like your project's `README.md`.

## JSDoc vs. Other Documentation

You asked about the difference between the documentation I generate and other types of documentation. Here's a breakdown:

*   **JSDoc-Generated Documentation (What I'm doing):**
    *   **Source of Truth:** The documentation lives directly in the code. This is a huge advantage because it's much more likely to be kept up to date. When a developer changes a function, they can update the comments in the same place.
    *   **Automation:** The documentation is generated automatically. This saves a lot of time and ensures that the documentation always reflects the current state of the code.
    *   **Focus:** It's primarily focused on API documentation—that is, documenting the public-facing parts of your code (functions, classes, etc.) so that other developers know how to use them.

*   **Manually Written Documentation (e.g., a separate `docs` folder with Markdown files):**
    *   **Flexibility:** You have complete control over the content and structure of the documentation. You can include tutorials, guides, and other types of content that might not fit well in API documentation.
    *   **Maintenance Burden:** The biggest disadvantage is that it's completely separate from the code. This makes it very easy for the documentation to become outdated. When the code changes, someone has to remember to go and update the documentation separately.
    *   **Use Cases:** This type of documentation is great for higher-level concepts, tutorials, and architectural overviews.

**In short, JSDoc is for documenting the "how" (how to use the API), while manual documentation is often better for the "why" and "what" (why the project exists, what its goals are, etc.).**

## How to Maintain the Documentation

Maintaining the documentation is now as simple as maintaining your code. Here's how you can do it:

1.  **Write JSDoc Comments for New Code:** Whenever you add a new function, class, or method that other developers will use, add a JSDoc comment above it. A good rule of thumb is to document anything that is exported from a module.

2.  **Update Comments When You Change Code:** If you change a function's parameters, return value, or behavior, be sure to update its JSDoc comment at the same time.

3.  **Regenerate the Documentation:** After you've added or updated your comments, simply run the following commands to regenerate the documentation:
    *   `npm run build:doc:html` to update the HTML documentation.
    *   `npm run build:doc:md` to update the Markdown documentation.

By following these simple steps, you can ensure that your project's documentation will always be accurate, up to date, and useful for everyone who works on it.
