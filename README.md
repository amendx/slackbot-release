# Notify Slack on changes

This GitHub Action sends a rich-text notification to your Slack channel when there's a new release in your GitHub repository.

We use [mack](https://github.com/tryfabric/mack)  to render the body of the release as Slack blocks.

<img width="782" alt="Design Master" src="https://user-images.githubusercontent.com/30783877/180804836-f2644f6f-ff79-4dd1-b3c9-04f6a56f91c1.png">
# Usage
## Instructions

- [Create a Slack app](https://api.slack.com/apps/new) called "Release Bot"
- Click **Incoming Webhooks** and toggle **Activate Incoming Webhooks**
- Click **Add New Webhook to Workspace**
- Pick the channel the app will post to and then click **Authorize**
- Set your `SLACK_WEBHOOK_URL` to the Webhook URL
- Create a workflow file

```yaml
name: Slackbot on release

on:
  release:
    types:
      - created

jobs:
  notify_slack:
    runs-on: ubuntu-latest
    name: Notify Slack on Release
    steps:
      - name: Notify Slack on Releases
        uses: amendx/slackbot-release@1.0.0
        with:
          slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

<img width="973" alt="Github actions" src="https://user-images.githubusercontent.com/30783877/180820722-c5d5b438-b02f-4501-8da3-ed3e742563aa.png">

## Developing locally
Install the dependencies

```bash
$ npm install
```
Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```
...
```

## Releasing
Cut a new release

```bash
$ release-it
```
