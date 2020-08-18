<p align="center">
  <img src="images/icons/icons8-bug-64.png" alt="Bug" />
</p>

<p align="center">
  <h2 align="center">Issue Submission Huidelines</h2>
</p>

<p align="center">
  Please read before submitting an issue to Nodemaker
</p>

## Bug Report

The most common type of bugs will likely be unexpected or broken outputs based on the frontend or `parameters.ts` inputs. When you encounter such issues, it is important to submit the JSON object that caused the bug.

To get the JSON from the Vue frontend, toggle on the developer tools (under View in the top menu). Locate which command you found an issue with (by viewing the console logs in the developer tools), and copy the object by right clicking the object, selecting "Store as global variable" and then running `copy(VAR_NAME)` in the console. Include this object directly in the issue or through a pastebin link.

If no object has been outputted because of an error in the frontend, toggle on the developer tools and screenshot the error message and include that in the issue along with a list of steps to replicate the issue.

Add any applicable tags as well.

## Feature Request

We would love any feature requests from the community!

When submitting a feature request, please specify (through tags) whether this issue is a frontend or backend request. Be as specific as possible with your specs and perhaps give some use cases of the new feature to illustrate the value add.
