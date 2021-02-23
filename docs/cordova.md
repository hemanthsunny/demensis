React + Cordova:
- BrowserRouter causes trouble in cordova App. Instead use HashRouter.
Explanation:
- The reasoning: BrowserRouter is meant for request-based environments whereas HashRouter is meant for file-based environments.
Ref:
1. https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md
2. https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron
