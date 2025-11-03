# Web GEM-Based Broken Access Control (BAC) Vulnerability (Test Application)

This project supports the paper "Web GEMs: Revealing Broken Access Control (BAC) Vulnerabilities in Large Web Applications Through Front-End Tampering". The goal of this project is to test the ability of popular web vulnerability scanners to detect Insecure Direct Object Reference (IDOR) vulnerabilities in SPA applications, where routing is handled by the front-end and the web server simply responds to HTTP requests to deliver content.

## Why this test?

- Classic IDOR issues occur when the web server mistakenly provides resources to unauthorized users who discover simple patterns in the URL (for example, from `/user/123` the adversary tries `/user/124`).
- In real web applications, these patterns are often not so simple. They may rely on pseudo-random IDs and the final URL may present a complicated structure.
- Web backend developers may neglect to protect these resources (perhaps believing the final URLs are impossible to guess).
- In web applications with a large web front end, this critical information may be stored in the GUI state, either as a result of a previous HTTP response or as a change in internal state.
- By exploiting browser development tools or reading the correct HTTP response, an adversary can access this information and create URLs to protected resources.
- We've found empirically that many applications implement this pattern (although, in reality, additional steps may be required).
- We believe this simple test can be useful to strengthen web scanners.

## Step to reproduce

- `git clone`.
- `npm install` (both in the root folder and within `client/` folder).
- build from the client `npm run build` (static content will be served by nest.js).
- test `http://localhost:3000/` with web scanners of your choice (OWASP ZAP, libraries, etc).
- this type of IDOR can only be found by extracting relevant information (i.e., IDs) from previous HTTP messages or by inspecting the component tree with Vue Dev Tool