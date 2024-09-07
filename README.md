# real-estate

- Added automatic sign-in after sign-up and redirect to home page
- Added cascade properites to referential relations in prisma schema
- Removed "res.status(200).json({ ...post, isSaved: false });" from post.controller.js to avoid sending two statuses
- Added disabled on click while saving a post to avoid sending multiple requests

